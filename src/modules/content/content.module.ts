import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ContentController } from './content.controller';
import { ContentDtoSchema } from './content.model';
import { ContentService } from './content.service';
import { UploadModule } from '../upload/upload.module';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Content', schema: ContentDtoSchema }]),
    forwardRef(() => AuthModule),
    UploadModule,
  ],

  providers: [ContentService, UploadService],
  controllers: [ContentController],
})
export class ContentModule {}
