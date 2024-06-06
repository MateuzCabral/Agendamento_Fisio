import { Injectable } from '@nestjs/common';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { SchedulingRepository } from './scheduling.repository';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';

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

  async create(createSchedulingDto: CreateSchedulingDto, filePath: string) {
    return await this.schedulingRepository.create({
      pedido_medico: filePath,
      primeira_consulta: createSchedulingDto.primeira_consulta,
      idPaciente: createSchedulingDto.idPaciente,
      status: 'Pendente',
      idFisioterapeuta: null,
      idCoordenador: null,
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

  async cancel(id: number) {
    return await this.schedulingRepository.cancel(id);
  }
}
