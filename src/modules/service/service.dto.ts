import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ServiceDto {
  @IsString()
  @IsNotEmpty()
  category: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsArray()
  @IsNotEmpty()
  paragraphs: string[];
}
