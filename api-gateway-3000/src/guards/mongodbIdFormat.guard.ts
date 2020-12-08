import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongodbIdFormatGuard implements CanActivate {
  constructor(private readonly errorMsg, private readonly paramName) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params[this.paramName];

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(this.errorMsg);
    }

    return true;
  }
}
