import { FindUserUseCase } from '@/modules/user/use-case/find-user.use-case';
import { FindUsersUseCase } from '@/modules/user/use-case/find-users.use-case';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findUsersUseCase: FindUsersUseCase
  ) {}

  @Get()
  async findAll() {
    return this.findUsersUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findUserUseCase.execute(id);
  }
}
