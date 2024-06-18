import { Injectable } from '@nestjs/common';
import { SchedulingRepository } from './scheduling.repository';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { CancelSchedulingDto } from './dto/cancel-scheduling.dto';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class SchedulingService {
  constructor(private schedulingRepository: SchedulingRepository) {}

  async findAll() {
    return await this.schedulingRepository.findAll();
  }

  async findOne(id: number) {
    return await this.schedulingRepository.findOne(id);
  }

  async findByPaciente(idPaciente: number) {
    return await this.schedulingRepository.findByPaciente(idPaciente);
  }

  async findByFisio(idFisioterapeuta: number) {
    return await this.schedulingRepository.findByFisio(idFisioterapeuta);
  }

  extractTokenFromHeader(authHeader: string): string | null {
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }

  async create(filePath: string, token: string) {
    const toto = this.extractTokenFromHeader(token);
    const decoded: any = jwt.verify(toto, process.env.SECRET_KEY);
    if (!decoded) {
      console.log('Ta invalido');
    }
    const id_paciente = Number(decoded.UserId);
    return await this.schedulingRepository.create({
      pedido_medico: filePath,
      idPaciente: id_paciente,
    });
  }

  async update(id: number, updateSchedulingDto: UpdateSchedulingDto) {
    return await this.schedulingRepository.update(id, {
      data_agendamento: updateSchedulingDto.data_agendamento,
      idFisioterapeuta: updateSchedulingDto.idFisioterapeuta,
      idCoordenador: updateSchedulingDto.idCoordenador,
      status: 'Aceito',
    });
  }

  async cancel(id: number, cancelSchedulingDto: CancelSchedulingDto) {
    return await this.schedulingRepository.cancel(
      id,
      cancelSchedulingDto.motivo_cancelamento,
    );
  }
}
