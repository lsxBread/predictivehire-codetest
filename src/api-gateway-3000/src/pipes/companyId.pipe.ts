import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CompanyIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    const { data } = metadata;
    if (!value) {
      throw new BadRequestException('Please pass in company_id');
    }
    if (data !== 'company_id') {
      throw new BadRequestException('Query param name should be company_id');
    }
    return value;
  }
}
