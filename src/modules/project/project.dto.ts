import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
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
