import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ServiceCategoriesController } from './service-categories.controller';
import { ServiceCategoryDtoSchema } from './service-categories.model';
import { ServiceCategoriesService } from './service-categories.service';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ServiceCategory', schema: ServiceCategoryDtoSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => ServiceModule),
  ],
  controllers: [ServiceCategoriesController],
  providers: [ServiceCategoriesService],
  exports: [
    ServiceCategoriesService,
    MongooseModule.forFeature([
      { name: 'ServiceCategory', schema: ServiceCategoryDtoSchema },
    ]),
  ],
})
export class ServiceCategoriesModule {}
