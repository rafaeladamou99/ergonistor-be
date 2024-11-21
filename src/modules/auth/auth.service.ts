import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserDto } from './auth-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: AuthUserDto) {
    const { password, email } = user;
    const _user = await this.userService.findUser(email);
    try {
      if (await bcrypt.compare(password, _user.password)) {
        const payload = { id: _user._id, email: user.email };
        const userRespose = {
          id: _user._id,
          email: user.email,
          access_token: await this.jwtService.signAsync(payload),
        };
        return userRespose;
      } else {
        throw new UnauthorizedException('Wrong credentials');
      }
    } catch (error) {
      throw error;
    }
  }
}
