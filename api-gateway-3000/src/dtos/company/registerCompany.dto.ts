import { IsString } from 'class-validator';

export class RegisterCompanyDto {
  @IsString()
  name: string;

  @IsString()
  address: number;
}
