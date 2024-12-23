import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  isArray,
} from 'class-validator';
import { ImageObject } from '../project/project.dto';

class SectionObject {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsArray()
  @IsNotEmpty()
  paragraphs: string[];
}

export class PeopleObject {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  position: string;
  @IsNotEmpty()
  img: ImageObject | string;
}

class PageObject {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  msg: string;
}

class HomeObject {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  msg: string;
}

class PageObjectWithSub extends PageObject {
  @IsString()
  @IsNotEmpty()
  subtitle: string;
}

class AboutObject extends PageObject {
  @IsArray()
  @IsNotEmpty()
  sections: SectionObject[];
  @IsArray()
  @IsNotEmpty()
  key_people: PeopleObject[];
}

class FaqObject extends PageObject {
  @IsArray()
  @IsNotEmpty()
  questions: SectionObject[];
}

class ContactMediumObject {
  @IsString()
  @IsNotEmpty()
  value: string;
  @IsString()
  @IsNotEmpty()
  msg: string;
}

class ContactObject extends PageObject {
  @IsObject()
  @IsNotEmpty()
  telephone: ContactMediumObject;
  @IsObject()
  @IsNotEmpty()
  email: ContactMediumObject;
}

class ContentResponse {
  @IsObject()
  @IsNotEmpty()
  home: HomeObject;
  @IsObject()
  @IsNotEmpty()
  services: PageObjectWithSub;
  @IsObject()
  @IsNotEmpty()
  projects: PageObjectWithSub;
  @IsObject()
  @IsNotEmpty()
  about: AboutObject;
  @IsObject()
  @IsNotEmpty()
  faq: FaqObject;
  @IsObject()
  @IsNotEmpty()
  contact: ContactObject;
}

export class ContentDto {
  @IsObject()
  @IsNotEmpty()
  content: ContentResponse;
  @IsString()
  @IsNotEmpty()
  content_title: string;
  @IsBoolean()
  @IsNotEmpty()
  is_primary: boolean;
}
