import { Injectable } from '@nestjs/common';
import { SchedulingRepository } from './scheduling.repository';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { CancelSchedulingDto } from './dto/cancel-scheduling.dto';
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

  async create(idPaciente: number, filePath: string) {
    const verifyScheduling =
      await this.schedulingRepository.findByPaciente(idPaciente);
    if (verifyScheduling.length > 0) {
      const agendamentoFalse = await this.schedulingRepository.create({
        pedido_medico: filePath,
        primeira_consulta: false,
        idPaciente: idPaciente,
      });
      return agendamentoFalse;
    }
    const agendamentoTrue = await this.schedulingRepository.create({
      pedido_medico: filePath,
      primeira_consulta: true,
      idPaciente: idPaciente,
    });
    return agendamentoTrue;
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
