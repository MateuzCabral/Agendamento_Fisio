import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class SchedulingRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.agendamento.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.agendamento.findUnique({
      where: { id },
    });
  }

  async findByPaciente(idPaciente: number) {
    return await this.prisma.agendamento.findMany({
      where: { idPaciente },
    });
  }

  async findByFisio(idFisioterapeuta: number) {
    return await this.prisma.agendamento.findMany({
      where: { idFisioterapeuta },
    });
  }

  async create(data: Prisma.AgendamentoCreateInput) {
    return await this.prisma.agendamento.create({ data });
  }

  async update(id: number, data: Prisma.AgendamentoUpdateInput) {
    return await this.prisma.agendamento.update({
      where: { id },
      data,
    });
  }

  async cancel(id: number, motivo_cancelamento: string) {
    return await this.prisma.agendamento.update({
      where: { id },
      data: {
        status: 'Cancelado',
        motivo_cancelamento,
      },
    });
  }
}
