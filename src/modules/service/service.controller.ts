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
import { AuthGuard } from '../auth/auth.guard';
import { ServiceDto } from './service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @UseGuards(AuthGuard)
  @Post()
  createService(@Body() serviceDto: ServiceDto) {
    return this.serviceService.createService(serviceDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateService(@Param('id') id: string, @Body() serviceDto: ServiceDto) {
    return this.serviceService.updateService(id, serviceDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteService(@Param('id') id: string) {
    return this.serviceService.deleteService(id);
  }

  @Get()
  async getServices() {
    return this.serviceService.getServices();
  }

  @Get(':id')
  async getService(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }
}
