import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { UploadService } from '../upload/upload.service';
import { ServiceController } from './service.controller';
import { ServiceDtoSchema } from './service.model';
import { ServiceService } from './service.service';
import { ServiceCategoriesService } from '../service-categories/service-categories.service';
import { ServiceCategoriesModule } from '../service-categories/service-categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServiceDtoSchema }]),
    forwardRef(() => AuthModule),
    UploadModule,
    forwardRef(() => ServiceCategoriesModule),
  ],
  providers: [ServiceService, UploadService, ServiceCategoriesService],
  controllers: [ServiceController],
  exports: [
    ServiceService,
    // MongooseModule.forFeature([{ name: 'Service', schema: ServiceDtoSchema }]),
  ],
})
export class ServiceModule {}
