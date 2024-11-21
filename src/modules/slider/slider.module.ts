import { Module, forwardRef } from '@nestjs/common';
import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SliderDtoSchema } from './slider.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Slider', schema: SliderDtoSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {}
