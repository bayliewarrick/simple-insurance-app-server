import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './application.entity';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // get one application
  @Get('/apps/:id')
  async findOne(@Param('id') id: number): Promise<Application> {
    const application = await this.applicationService.findOne(id);
    if (!application) {
      throw new Error('Application not found');
    }
    return application;
  }

  // get all applications
  @Get('/all')
  getAll(): Promise<Application[]> {
    return this.applicationService.getAll();
  }

  // create an application (storing just the email)
  @Post('/create')
  async create(@Body() application: Application): Promise<any> {
    return this.applicationService.create(application);
  }

  // finalize the application
  @Post('/finalize')
  async finalize(@Body() application: Application): Promise<Application | any> {
    return this.applicationService.finalize(application);
  }

  // edit an application
  @Post('/edit')
  async edit(@Body() application: Application): Promise<Application | any> {
    return this.applicationService.edit(application);
  }

  // delete an application
  @Delete('/delete')
  delete(@Body('id') id: number): Promise<void> {
    const application = this.applicationService.findOne(id);
    if (!application) {
      throw new Error('Application not found');
    }
    return this.applicationService.delete(id);
  }
}
