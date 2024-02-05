import { Module } from '@nestjs/common';
// import { DatabaseModule } from '../database/database.module';
// import { photoProviders } from './photo.providers';
// import { PhotoService } from './photo.service';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Application } from './application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
