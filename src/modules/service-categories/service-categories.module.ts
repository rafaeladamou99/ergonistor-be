import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { ServiceCategoriesController } from './service-categories.controller';
import { ServiceCategoryDtoSchema } from './service-categories.model';
import { ServiceCategoriesService } from './service-categories.service';
import { UploadService } from '../upload/upload.service';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ServiceCategory', schema: ServiceCategoryDtoSchema },
    ]),
    forwardRef(() => AuthModule),
    UploadModule,
    forwardRef(() => ServiceModule),
  ],
  controllers: [ServiceCategoriesController],
  providers: [ServiceCategoriesService, UploadService],
  exports: [
    ServiceCategoriesService,
    MongooseModule.forFeature([
      { name: 'ServiceCategory', schema: ServiceCategoryDtoSchema },
    ]),
  ],
})
export class ServiceCategoriesModule {}
