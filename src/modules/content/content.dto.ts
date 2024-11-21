import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  isArray,
} from 'class-validator';

class SectionObject {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsArray()
  @IsNotEmpty()
  paragraphs: string[];
}

class PeopleObject {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  position: string;
  @IsString()
  @IsNotEmpty()
  img: string;
}

class PageObject {
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
  home: PageObject;
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
