import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadService } from '../upload/upload.service';
import { SliderDto } from './slider.dto';
import { Slider } from './slider.model';

@Injectable()
export class SliderService {
  constructor(
    @InjectModel('Slider')
    private readonly sliderModel: Model<Slider>,
    private readonly uploadService: UploadService,
  ) {}

  async findById(id: string) {
    try {
      const slider = this.sliderModel.findById(id).exec();
      if (!slider) {
        throw new NotFoundException('Could not find slider');
      }
      return slider;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async createSlider(slider: SliderDto) {
    try {
      const sliders = await this.sliderModel.find().exec();
      if (sliders.length) {
        throw new InternalServerErrorException('Slider already exists');
      }
      if (slider.imgs.length > 10) {
        throw new InternalServerErrorException('Images cannot be more than 10');
      }

      const { imgs, logo } = slider;

      const newImgs: string[] = [];

      for (const img of imgs) {
        if (typeof img === 'string') {
          newImgs.push(img);
        } else {
          const url = await this.uploadService.upload(
            img.name,
            Buffer.from(img.buffer),
          );
          newImgs.push(url);
        }
      }

      const logoUrl =
        typeof logo === 'string'
          ? logo
          : await this.uploadService.upload(
              logo.name,
              Buffer.from(logo.buffer),
            );

      const modifiedSlider = {
        ...slider,
        imgs: newImgs,
        logo: logoUrl,
      };

      const newContent = await new this.sliderModel(modifiedSlider).save();
      return newContent;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async updateSlider(id: string, sliderDto: SliderDto) {
    try {
      if (sliderDto.imgs.length > 10) {
        throw new InternalServerErrorException('Images cannot be more than 10');
      }

      const { imgs, logo } = sliderDto;

      const newImgs: string[] = [];

      for (const img of imgs) {
        if (typeof img === 'string') {
          newImgs.push(img);
        } else {
          const url = await this.uploadService.upload(
            img.name,
            Buffer.from(img.buffer),
          );
          newImgs.push(url);
        }
      }

      const logoUrl =
        typeof logo === 'string'
          ? logo
          : await this.uploadService.upload(
              logo.name,
              Buffer.from(logo.buffer),
            );

      const modifiedSlider = {
        ...sliderDto,
        imgs: newImgs,
        logo: logoUrl,
      };

      const slider = this.sliderModel
        .findByIdAndUpdate(id, modifiedSlider, {
          new: true,
          runValidators: true,
        })
        .exec();
      return slider;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async deleteSlider(id: string) {
    try {
      const deletedSlider = await this.sliderModel.findByIdAndDelete(id).exec();
      if (!deletedSlider) {
        throw new NotFoundException('Could not find slider');
      }
      return deletedSlider;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async getSliders() {
    try {
      const sliders = await this.sliderModel.find().exec();
      return sliders;
    } catch {
      throw new InternalServerErrorException('Error');
    }
  }
}
