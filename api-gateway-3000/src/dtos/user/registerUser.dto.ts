import { IsString, IsEnum } from 'class-validator';
import { Role } from '../../enum/role.enum';

export class RegisterUserDto {
  @IsString()
  name: string;
  
  @IsString()
  username: number;
  
  @IsString()
  password: string;
  
  @IsEnum(Role)
  role: string;
  
  @IsString()
  companyId: string;
}
