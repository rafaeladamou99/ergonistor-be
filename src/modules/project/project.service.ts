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
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<Project>,
    private readonly uploadService: UploadService,
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
      const { img1, img2, img3, img4, img5 } = project;

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

      const modifiedProject = {
        ...project,
        img1: url1,
        img2: url2,
        img3: url3,
        img4: url4,
        img5: url5,
      };

      const newContent = await new this.projectModel(modifiedProject).save();
      return newContent;
    } catch (error) {
      throw new InternalServerErrorException('Error');
    }
  }

  async updateProject(id: string, projectDto: ProjectDto) {
    try {
      const modifiedProject: Partial<ProjectDto> = { ...projectDto };

      const { img1, img2, img3, img4, img5 } = modifiedProject;

      if (img1) {
        const url1 = await this.uploadService.upload(
          img1.name,
          Buffer.from(img1.buffer),
        );
        Object.defineProperty(modifiedProject, 'img1', { value: url1 });
      }

      if (img2) {
        const url2 = await this.uploadService.upload(
          img2.name,
          Buffer.from(img2.buffer),
        );
        Object.defineProperty(modifiedProject, 'img2', { value: url2 });
      }

      if (img3) {
        const url3 = await this.uploadService.upload(
          img3.name,
          Buffer.from(img3.buffer),
        );
        Object.defineProperty(modifiedProject, 'img3', { value: url3 });
      }

      if (img4) {
        const url4 = await this.uploadService.upload(
          img4.name,
          Buffer.from(img4.buffer),
        );
        Object.defineProperty(modifiedProject, 'img4', { value: url4 });
      }

      if (img5) {
        const url5 = await this.uploadService.upload(
          img5.name,
          Buffer.from(img5.buffer),
        );
        Object.defineProperty(modifiedProject, 'img5', { value: url5 });
      }

      const project = this.projectModel
        .findByIdAndUpdate(
          id,
          { $set: modifiedProject },
          {
            new: true,
            runValidators: true,
          },
        )
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
