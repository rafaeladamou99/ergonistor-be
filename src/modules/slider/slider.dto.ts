import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class ImageObject {
  @IsNotEmpty()
  buffer: Buffer;
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class SliderDto {
  @IsString()
  @IsNotEmpty()
  msg: string;
  @IsArray()
  @Type(() => ImageObject)
  @ValidateIf((obj) => typeof obj === 'object' || typeof obj === 'string')
  imgs: (ImageObject | string)[];
  @IsObject()
  @IsOptional()
  logo: ImageObject;
}
