import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SliderDto } from './slider.dto';
import { Slider } from './slider.model';

@Injectable()
export class SliderService {
  constructor(
    @InjectModel('Slider')
    private readonly sliderModel: Model<Slider>,
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
      const newContent = await new this.sliderModel(slider).save();
      return newContent;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async updateSlider(id: string, sliderDto: SliderDto) {
    try {
      const slider = this.sliderModel
        .findByIdAndUpdate(id, sliderDto, {
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
