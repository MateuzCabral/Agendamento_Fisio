import { Injectable, BadRequestException } from '@nestjs/common';
import { SchedulingRepository } from './scheduling.repository';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { CancelSchedulingDto } from './dto/cancel-scheduling.dto';
import * as jwt from 'jsonwebtoken';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SchedulingService {
  constructor(
    private schedulingRepository: SchedulingRepository,
    private readonly httpService: HttpService,
  ) {}

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
    const url = `${process.env.URL}/Paciente/${id_paciente}/PrimeiraConsulta`;

    const ultimoAgendamento =
      await this.schedulingRepository.findLastByPaciente(id_paciente);
    if (ultimoAgendamento && ultimoAgendamento.status !== 'Aceito') {
      throw new BadRequestException(
        'O último agendamento não foi aceito. Novo agendamento bloqueado',
      );
    }

    const verify = await this.schedulingRepository.findByPaciente(id_paciente);
    if (verify.length > 0) {
      const response = await firstValueFrom(this.httpService.patch(url));
      console.log(response);
    }

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
