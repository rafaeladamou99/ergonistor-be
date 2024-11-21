import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SliderDto {
  @IsString()
  @IsNotEmpty()
  msg: string;
  @IsArray()
  @IsNotEmpty()
  imgs: string[];
}
