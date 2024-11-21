import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ServiceController } from './service.controller';
import { ServiceDtoSchema } from './service.model';
import { ServiceService } from './service.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServiceDtoSchema }]),
    forwardRef(() => AuthModule),
  ],

  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
