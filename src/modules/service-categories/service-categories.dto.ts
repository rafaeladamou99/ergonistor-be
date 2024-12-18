import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class ImageObject {
  @IsNotEmpty()
  buffer: Buffer;
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class ServiceCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsObject()
  @IsOptional()
  img: ImageObject;
}
