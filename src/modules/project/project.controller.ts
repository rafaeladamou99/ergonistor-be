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
import { ProjectDto } from './project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @Post()
  createProject(@Body() projectDto: ProjectDto) {
    return this.projectService.createProject(projectDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProject(@Param('id') id: string, @Body() projectDto: ProjectDto) {
    return this.projectService.updateProject(id, projectDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Get()
  async getProjects() {
    return this.projectService.getProjects();
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projectService.findById(id);
  }
}
