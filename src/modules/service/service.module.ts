import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ServiceController } from './service.controller';
import { ServiceDtoSchema } from './service.model';
import { ServiceService } from './service.service';
import { ServiceCategoriesService } from '../service-categories/service-categories.service';
import { ServiceCategoriesModule } from '../service-categories/service-categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServiceDtoSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => ServiceCategoriesModule),
  ],
  providers: [ServiceService, ServiceCategoriesService],
  controllers: [ServiceController],
  exports: [ServiceService],
})
export class ServiceModule {}
