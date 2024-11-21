import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsArray()
  @IsNotEmpty()
  paragraphs: string[];
  @IsString()
  @IsNotEmpty()
  img: string;
}
