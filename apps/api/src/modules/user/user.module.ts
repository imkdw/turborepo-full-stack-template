import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FindUserUseCase } from '@/modules/user/use-case/find-user.use-case';
import { FindUsersUseCase } from '@/modules/user/use-case/find-users.use-case';

@Module({
  controllers: [UserController],
  providers: [FindUserUseCase, FindUsersUseCase],
})
export class UserModule {}
