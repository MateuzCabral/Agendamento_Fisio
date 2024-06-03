import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class SchedulingRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AgendamentoCreateInput) {
    return await this.prisma.agendamento.create({ data });
  }
}
