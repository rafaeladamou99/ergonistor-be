import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, passwordRegex } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException('Could not find user');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async createUser(user: CreateUserDto) {
    const { email, password, repeat_password } = user;
    if (!passwordRegex.test(password)) {
      throw new ConflictException(
        'Password should be between 6 to 20 characters',
      );
    }
    try {
      await this.findUser(email);
      throw new ConflictException('User already exists');
    } catch (error) {
      if (error instanceof NotFoundException) {
        const newUser = new this.userModel({
          email,
          password,
        });
        const user = await newUser.save();
        const payload = { id: user._id, email: user.email };
        const userRespose = {
          id: user._id,
          email: user.email,
          access_token: await this.jwtService.signAsync(payload),
        };
        return userRespose;
      }
      throw error;
    }
  }
}
