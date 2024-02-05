import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';

// handle error function
const handleError = (error: string): ErrorResponse => {
  return { error };
};

// error response type
type ErrorResponse = { error: string };

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  // find one application by id
  async findOne(id: number): Promise<any> {
    return await this.applicationRepository.findOne({ where: { id } });
  }

  // get all applications
  async getAll(): Promise<any> {
    return await this.applicationRepository.find();
  }

  // creates the initial application by storing the email address
  async create(application: Application): Promise<Application | ErrorResponse> {
    if (application.id) {
      return handleError(
        'Id is not a valid field for creating a new application.',
      );
    }
    const newApplication = this.applicationRepository.create({
      ...application,
      is_deleted: false,
      status: 'PENDING',
      effective_date: new Date(),
    });

    return await this.applicationRepository.save(newApplication);
  }

  // finalizes an application after initial email address submission
  async finalize(
    application: Application,
  ): Promise<Application | ErrorResponse> {
    const finalizedApplication: Application | any =
      await this.applicationRepository.findOne({
        where: { email_address: application.email_address },
      });
    if (!finalizedApplication) {
      return handleError('Application not found');
    }
    for (const key in application) {
      finalizedApplication[key as keyof Application] =
        application[key as keyof Application];
    }

    finalizedApplication.status = 'SUBMITTED';

    return await this.applicationRepository.save(finalizedApplication);
  }

  // edit an application
  async edit(application: Application): Promise<Application | ErrorResponse> {
    const foundApplication = await this.applicationRepository.findOne({
      where: { id: application.id },
    });
    if (!foundApplication) {
      return handleError('Application not found');
    }
    const editedApplication = { ...foundApplication, ...application };

    return await this.applicationRepository.save(editedApplication);
  }

  async delete(id: number): Promise<void> {
    await this.applicationRepository.delete(id);
  }
}
