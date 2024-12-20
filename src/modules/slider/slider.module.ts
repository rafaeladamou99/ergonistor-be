import { Module, forwardRef } from '@nestjs/common';
import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SliderDtoSchema } from './slider.model';
import { UploadModule } from '../upload/upload.module';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Slider', schema: SliderDtoSchema }]),
    forwardRef(() => AuthModule),
    UploadModule,
  ],
  controllers: [SliderController],
  providers: [SliderService, UploadService],
})
export class SliderModule {}
