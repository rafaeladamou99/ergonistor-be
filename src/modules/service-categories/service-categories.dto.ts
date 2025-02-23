import { IsNotEmpty, IsString } from 'class-validator';
export class ServiceCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
