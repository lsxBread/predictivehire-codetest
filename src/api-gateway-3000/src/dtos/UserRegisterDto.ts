import { Role } from 'src/enum/role.enum';

export class UserRegisterDto {
  constructor(
    private readonly name: string,
    private readonly username: string,
    private readonly password: string,
    private readonly role: Role,
    private readonly companyId: string,
  ) {}
}
