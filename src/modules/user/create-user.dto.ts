import { IsNotEmpty, IsString } from 'class-validator';
import { AuthUserDto } from '../auth/auth-user.dto';

export class CreateUserDto extends AuthUserDto {
  @IsString()
  @IsNotEmpty()
  repeat_password: string;
}
