import * as mongoose from 'mongoose';

// SectionObject schema
const SectionObjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paragraphs: { type: [String], required: true },
});

const ContactMediumSchema = new mongoose.Schema({
  value: { type: String, required: true },
  msg: { type: String, required: true },
});
// PeopleObject schema
const PeopleObjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  img: { type: String, required: true },
});

// PageObject schema
const PageObjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  msg: { type: String, required: true },
});

// HomeObject schema
const HomeObjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  msg: { type: String, required: true },
});

const PageContactSchema = new mongoose.Schema({
  title: { type: String, required: true },
  msg: { type: String, required: true },
  telephone: { type: ContactMediumSchema, required: true },
  email: { type: ContactMediumSchema, required: true },
});

// PageObjectWithSub schema (extends PageObject)
const PageObjectWithSubSchema = new mongoose.Schema({
  title: { type: String, required: true },
  msg: { type: String, required: true },
  subtitle: { type: String, required: true },
});

// AboutObject schema (extends PageObject)
const AboutObjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  msg: { type: String, required: true },
  sections: { type: [SectionObjectSchema], required: true },
  key_people: { type: [PeopleObjectSchema], required: true },
});

// FaqObject schema (extends PageObject)
const FaqObjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  msg: { type: String, required: true },
  questions: { type: [SectionObjectSchema], required: true },
});

// ContentResponse schema
const ContentResponseSchema = new mongoose.Schema({
  home: { type: HomeObjectSchema, required: true },
  services: { type: PageObjectWithSubSchema, required: true },
  projects: { type: PageObjectWithSubSchema, required: true },
  about: { type: AboutObjectSchema, required: true },
  faq: { type: FaqObjectSchema, required: true },
  contact: { type: PageContactSchema, required: true },
});

// Main ContentDto schema
export const ContentDtoSchema = new mongoose.Schema({
  content: { type: ContentResponseSchema, required: true },
  content_title: { type: String, required: true, unique: true },
  is_primary: { type: Boolean, required: true },
});

// SectionObject interface
interface ISectionObject {
  title: string;
  paragraphs: string[];
}

// PeopleObject interface
interface IPeopleObject {
  name: string;
  position: string;
  img: string;
}

// PageObject interface
interface IPageObject {
  title: string;
  msg: string;
}

interface IHomeObject extends IPageObject {}

// PageObjectWithSub interface (extends IPageObject)
interface IPageObjectWithSub extends IPageObject {
  subtitle: string;
}

// AboutObject interface (extends IPageObject)
interface IAboutObject extends IPageObject {
  sections: ISectionObject[];
  key_people: IPeopleObject[];
}

// FaqObject interface (extends IPageObject)
interface IFaqObject extends IPageObject {
  questions: ISectionObject[];
}

interface IContactMediumObject {
  value: string;
  msg: string;
}

interface IContactObject extends IPageObject {
  telephone: IContactMediumObject;
  email: IContactMediumObject;
}

// ContentResponse interface
interface IContentResponse {
  home: IHomeObject;
  services: IPageObjectWithSub;
  projects: IPageObjectWithSub;
  about: IAboutObject;
  faq: IFaqObject;
  contact: IContactObject;
}

// Main ContentDto document interface
export interface Content extends mongoose.Document {
  content: IContentResponse;
  content_title: string;
  is_primary: boolean;
}
