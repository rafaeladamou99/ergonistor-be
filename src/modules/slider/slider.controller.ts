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
import { SliderService } from './slider.service';
import { SliderDto } from './slider.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('slider')
export class SliderController {
  constructor(private sliderService: SliderService) {}

  @UseGuards(AuthGuard)
  @Post()
  createSlider(@Body() sliderDto: SliderDto) {
    return this.sliderService.createSlider(sliderDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateSlider(@Param('id') id: string, @Body() sliderDto: SliderDto) {
    return this.sliderService.updateSlider(id, sliderDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteSlider(@Param('id') id: string) {
    return this.sliderService.deleteSlider(id);
  }

  @Get()
  async getSliders() {
    return this.sliderService.getSliders();
  }

  @Get(':id')
  async getSlider(@Param('id') id: string) {
    return this.sliderService.findById(id);
  }
}
