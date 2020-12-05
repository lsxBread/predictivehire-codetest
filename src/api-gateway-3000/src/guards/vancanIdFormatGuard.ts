import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class VacancyIdFormatGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Vacancy id format is wrong');
    }

    return true;
  }
}
