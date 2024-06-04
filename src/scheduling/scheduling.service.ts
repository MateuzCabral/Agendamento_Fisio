import { Injectable } from '@nestjs/common';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { SchedulingRepository } from './scheduling.repository';

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

  async create(createSchedulingDto: CreateSchedulingDto) {
    return await this.schedulingRepository.create({
      pedido_medico: createSchedulingDto.pedido_medico,
      primeira_consulta: createSchedulingDto.primeira_consulta,
      idPaciente: createSchedulingDto.idPaciente,
      status: 'Pendente',
      idFisioterapeuta: null,
      idCoordenador: null,
    });
  }
}
