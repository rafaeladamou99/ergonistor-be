import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ServiceCategoriesService } from './service-categories.service';
import { AuthGuard } from '../auth/auth.guard';
import { ServiceCategoryDto } from './service-categories.dto';

@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(private serviceCategoriesService: ServiceCategoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  createService(@Body() serviceDto: ServiceCategoryDto) {
    return this.serviceCategoriesService.createServiceCategory(serviceDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() serviceDto: ServiceCategoryDto,
  ) {
    return this.serviceCategoriesService.updateServiceCategory(id, serviceDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteService(@Param('id') id: string) {
    return this.serviceCategoriesService.deleteServiceCategory(id);
  }

  @Get()
  async getServices() {
    return this.serviceCategoriesService.getServiceCategories();
  }

  @Get(':id')
  async getService(@Param('id') id: string) {
    return this.serviceCategoriesService.findById(id);
  }
}
