import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceDto } from './service.dto';
import { Service } from './service.model';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<Service>,
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

  async createService(service: ServiceDto) {
    try {
      const newContent = await new this.serviceModel(service).save();
      return newContent;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async updateService(id: string, serviceDto: ServiceDto) {
    try {
      const service = this.serviceModel
        .findByIdAndUpdate(id, serviceDto, {
          new: true,
          runValidators: true,
        })
        .exec();
      return service;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
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

  async getServices() {
    try {
      const services = await this.serviceModel.find().exec();
      return services;
    } catch {
      throw new InternalServerErrorException('Error');
    }
  }
}
