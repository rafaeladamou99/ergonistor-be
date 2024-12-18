import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ImageObject {
  @IsNotEmpty()
  buffer: Buffer;
  @IsString()
  @IsNotEmpty()
  name: string;
}
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
  @IsObject()
  @IsOptional()
  img1: ImageObject;
  @IsObject()
  @IsOptional()
  img2: ImageObject;
  @IsObject()
  @IsOptional()
  img3: ImageObject;
  @IsObject()
  @IsOptional()
  img4: ImageObject;
  @IsObject()
  @IsOptional()
  img5: ImageObject;
}
