import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentDto, PeopleObject } from './content.dto';
import { Content, IContentResponse, IPeopleObject } from './content.model';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content')
    private readonly contentModel: Model<Content>,
    private readonly uploadService: UploadService,
  ) {}

  async findContent(content_title: string) {
    try {
      const foundContent = await this.contentModel
        .findOne({ content_title })
        .exec();
      if (!foundContent) {
        throw new NotFoundException('Could not find content');
      }
      return foundContent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async getById(id: string) {
    try {
      const foundContent = await this.contentModel.findById(id).exec();
      if (!foundContent) {
        throw new NotFoundException('Could not find content');
      }
      return foundContent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async deleteContent(content_title: string) {
    try {
      const foundContent = await this.contentModel
        .findOneAndDelete({ content_title })
        .exec();
      if (!foundContent) {
        throw new NotFoundException('Could not find content');
      }
      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async findPrimaryContent() {
    try {
      const foundContent = await this.contentModel
        .findOne({ is_primary: true })
        .exec();
      if (!foundContent) {
        throw new NotFoundException('Could not find primary content');
      }
      return foundContent;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async setContentAsNonPrimary() {
    try {
      const previouslyPrimaryContent = await this.findPrimaryContent();
      previouslyPrimaryContent.is_primary = false;
      const updatedContent = await previouslyPrimaryContent.save();
      return updatedContent;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }
  }

  async getKeyPeople(keyPeople: PeopleObject[]) {
    const _keyPeople: PeopleObject[] = [];
    for (const person of keyPeople) {
      const img =
        typeof person.img === 'string'
          ? person.img
          : await this.uploadService.upload(
              person.img.name,
              Buffer.from(person.img.buffer),
            );
      const newPerson = {
        ...person,
        img,
      };
      _keyPeople.push(newPerson);
    }
    return _keyPeople;
  }

  async updateContent(content: ContentDto) {
    try {
      const foundContent = await this.findContent(content.content_title);
      const _key_people = await this.getKeyPeople(
        content.content.about.key_people,
      );
      content.content.about.key_people = _key_people;

      foundContent.content = content.content as IContentResponse;

      if (content.is_primary && !foundContent.is_primary) {
        await this.setContentAsNonPrimary();
      } else if (!content.is_primary && foundContent.is_primary) {
        throw new ConflictException(
          'Please set another content as primary to unset this one',
        );
      } else {
        try {
          await this.findPrimaryContent();
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw new NotFoundException(
              'Please set content as primary as there is no other primary content',
            );
          }
          throw error;
        }
      }
      foundContent.is_primary = content.is_primary;
      const updatedContent = await foundContent.save();
      return updatedContent;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async createContent(content: ContentDto) {
    try {
      await this.findContent(content.content_title);
      throw new ConflictException('Content name already exists');
    } catch (error) {
      if (error instanceof NotFoundException) {
        const newContent = new this.contentModel(content);
        if (newContent.is_primary) {
          await this.setContentAsNonPrimary();
        }

        const _key_people = await this.getKeyPeople(
          newContent.content.about.key_people,
        );
        newContent.content.about.key_people = _key_people as IPeopleObject[];

        const _content = await newContent.save();
        return _content;
      }
      throw error;
    }
  }

  async getAllContents() {
    try {
      const foundContents = await this.contentModel.find().exec();
      return foundContents;
    } catch (error) {
      throw error;
    }
  }
}
