import {
  Get,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.model';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<Project>,
  ) {}

  async findById(id: string) {
    try {
      const project = this.projectModel.findById(id).exec();
      if (!project) {
        throw new NotFoundException('Could not find project');
      }
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async createProject(project: ProjectDto) {
    try {
      const newContent = await new this.projectModel(project).save();
      return newContent;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async updateProject(id: string, projectDto: ProjectDto) {
    try {
      const project = this.projectModel
        .findByIdAndUpdate(id, projectDto, {
          new: true,
          runValidators: true,
        })
        .exec();
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async deleteProject(id: string) {
    try {
      const deletedProject = await this.projectModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedProject) {
        throw new NotFoundException('Could not find project');
      }
      return deletedProject;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error');
    }
  }

  async getProjects() {
    try {
      const projects = await this.projectModel.find().exec();
      return projects;
    } catch {
      throw new InternalServerErrorException('Error');
    }
  }
}
