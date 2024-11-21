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
import { ContentService } from './content.service';
import { ContentDto } from './content.dto';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Put()
  updateContent(@Body() contentDto: ContentDto) {
    return this.contentService.updateContent(contentDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  createContent(@Body() contentDto: ContentDto) {
    return this.contentService.createContent(contentDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  deleteContent(@Body() { content_title }: { content_title: string }) {
    return this.contentService.deleteContent(content_title);
  }

  @UseGuards(AuthGuard)
  @Get('all-contents')
  getAllContents() {
    return this.contentService.getAllContents();
  }

  @UseGuards(AuthGuard)
  @Get('all-contents/:id')
  getSingleContentById(@Param('id') id: string) {
    return this.contentService.getById(id);
  }

  @Get()
  getContent() {
    return this.contentService.findPrimaryContent();
  }
}
