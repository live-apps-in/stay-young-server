import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dynamic, dynamicSchema } from './model/dynamic.model';
import { DynamicController } from './controller/dynamic.controller';
import { DynamicService } from './service/dynamic.service';
import { DynamicRepository } from './repository/dynamic.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dynamic.name, schema: dynamicSchema }]),
  ],
  controllers: [DynamicController],
  providers: [DynamicService, DynamicRepository],
})
export class DynamicModule {}
