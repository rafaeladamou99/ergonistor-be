import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceCategory } from './service-categories.model';
import { Model } from 'mongoose';
import { ServiceCategoryDto } from './service-categories.dto';
import { ServiceService } from '../service/service.service';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectModel('ServiceCategory')
    private readonly serviceCategoryModel: Model<ServiceCategory>,
    @Inject(forwardRef(() => ServiceService))
    private readonly service: ServiceService,
  ) {}

  async findById(id: string) {
    try {
      const service = this.serviceCategoryModel.findById(id).exec();
      if (!service) {
        throw new NotFoundException('Could not find service');
      }
      return service;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async findByTitle(title: string) {
    try {
      const service = this.serviceCategoryModel.find({ title }).exec();
      if (!service) {
        throw new NotFoundException('Could not find service');
      }
      return service;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async createServiceCategory(service: ServiceCategoryDto) {
    try {
      const newContent = await new this.serviceCategoryModel(service).save();
      return newContent;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async updateServiceCategory(id: string, serviceDto: ServiceCategoryDto) {
    try {
      const service = await this.serviceCategoryModel
        .findByIdAndUpdate(
          id,
          { $set: serviceDto },
          { new: true, runValidators: true },
        )
        .exec();

      return service;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating the service');
    }
  }

  async deleteServiceCategory(id: string) {
    try {
      const isCategoryUsed = this.service.findByCategoryId(id);
      if (isCategoryUsed) {
        throw new ForbiddenException('Category is already in use');
      }
      const deletedService = await this.serviceCategoryModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedService) {
        throw new NotFoundException('Could not find service');
      }
      return deletedService;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async getServiceCategories() {
    try {
      const services = await this.serviceCategoryModel.find().exec();
      return services;
    } catch {
      throw new InternalServerErrorException('Error');
    }
  }
}
