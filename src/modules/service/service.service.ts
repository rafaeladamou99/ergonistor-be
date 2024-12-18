import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadService } from '../upload/upload.service';
import { ServiceDto } from './service.dto';
import { Service } from './service.model';
import { ServiceCategoriesService } from '../service-categories/service-categories.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<Service>,
    private readonly uploadService: UploadService,
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
      const { img1, img2, img3, img4, img5 } = service;

      const url1 = await this.uploadService.upload(
        img1.name,
        Buffer.from(img1.buffer),
      );

      const url2 = img2
        ? await this.uploadService.upload(img2.name, Buffer.from(img2.buffer))
        : '';
      const url3 = img3
        ? await this.uploadService.upload(img3.name, Buffer.from(img3.buffer))
        : '';
      const url4 = img4
        ? await this.uploadService.upload(img4.name, Buffer.from(img4.buffer))
        : '';
      const url5 = img5
        ? await this.uploadService.upload(img5.name, Buffer.from(img5.buffer))
        : '';

      const modifiedService = {
        ...service,
        img1: url1,
        img2: url2,
        img3: url3,
        img4: url4,
        img5: url5,
      };
      const newContent = await new this.serviceModel(modifiedService).save();
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
      const modifiedService: Partial<ServiceDto> = { ...serviceDto };

      const { img1, img2, img3, img4, img5 } = modifiedService;

      if (img1) {
        const url1 = await this.uploadService.upload(
          img1.name,
          Buffer.from(img1.buffer),
        );
        Object.defineProperty(modifiedService, 'img1', { value: url1 });
      }

      if (img2) {
        const url2 = await this.uploadService.upload(
          img2.name,
          Buffer.from(img2.buffer),
        );
        Object.defineProperty(modifiedService, 'img2', { value: url2 });
      }

      if (img3) {
        const url3 = await this.uploadService.upload(
          img3.name,
          Buffer.from(img3.buffer),
        );
        Object.defineProperty(modifiedService, 'img3', { value: url3 });
      }

      if (img4) {
        const url4 = await this.uploadService.upload(
          img4.name,
          Buffer.from(img4.buffer),
        );
        Object.defineProperty(modifiedService, 'img4', { value: url4 });
      }

      if (img5) {
        const url5 = await this.uploadService.upload(
          img5.name,
          Buffer.from(img5.buffer),
        );
        Object.defineProperty(modifiedService, 'img5', { value: url5 });
      }

      const service = await this.serviceModel
        .findByIdAndUpdate(
          id,
          { $set: modifiedService },
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
