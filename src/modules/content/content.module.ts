import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ContentController } from './content.controller';
import { ContentDtoSchema } from './content.model';
import { ContentService } from './content.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Content', schema: ContentDtoSchema }]),
    forwardRef(() => AuthModule),
  ],

  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
