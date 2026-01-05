import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@/infra/database';

@Injectable()
export class FindUsersUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
