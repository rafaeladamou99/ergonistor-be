import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ProjectController } from './project.controller';
import { ProjectDtoSchema } from './project.model';
import { ProjectService } from './project.service';
import { UploadModule } from '../upload/upload.module';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectDtoSchema }]),
    forwardRef(() => AuthModule),
    UploadModule,
  ],

  providers: [ProjectService, UploadService],
  controllers: [ProjectController],
})
export class ProjectModule {}
