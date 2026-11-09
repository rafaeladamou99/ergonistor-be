import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceDto } from './service.dto';
import { Service } from './service.model';
import { ServiceCategoriesService } from '../service-categories/service-categories.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<Service>,
    @Inject(forwardRef(() => ServiceCategoriesService))
    private readonly serviceCategories: ServiceCategoriesService,
  ) {}

  async findById(id: string) {
    try {
      const service = this.serviceModel.findById(id).exec();
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

  async findByCategoryId(id: string) {
    try {
      const service = this.serviceModel.findOne({ category: id }).exec();
      return !!service;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async createService(service: ServiceDto) {
    try {
      const category = await this.serviceCategories.findByTitle(
        service.category,
      );
      if (!category) {
        throw new InternalServerErrorException('Category not found');
      }
      const newContent = await new this.serviceModel(service).save();
      return newContent;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async updateService(id: string, serviceDto: ServiceDto) {
    try {
      const category = await this.serviceCategories.findByTitle(
        serviceDto.category,
      );
      if (!category) {
        throw new InternalServerErrorException('Category not found');
      }
      const service = await this.serviceModel
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

  async deleteService(id: string) {
    try {
      const deletedService = await this.serviceModel
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

  async getServices(category?: string) {
    try {
      const filter = category ? { category } : {};
      const services = await this.serviceModel.find(filter).exec();
      return services;
    } catch {
      throw new InternalServerErrorException('Error');
    }
  }
}
