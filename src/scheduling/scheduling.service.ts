import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const returnToken = this.extractTokenFromHeader(token);
    const decoded: any = jwt.verify(returnToken, process.env.SECRET_KEY);
    if (!decoded) {
      throw new UnauthorizedException();
    }

    const id_paciente = Number(decoded.UserId);

    // Paciente só criar outro agendamento se ele não estiver com status de pendente
    const ultimoAgendamento =
      await this.schedulingRepository.findLastByPaciente(id_paciente);
    if (ultimoAgendamento && ultimoAgendamento.status == 'Pendente') {
      throw new BadRequestException(
        'O último agendamento ainda está pendente, Novo agendamento bloqueado',
      );
    }

    return await this.schedulingRepository.create({
      pedido_medico: filePath,
      idPaciente: id_paciente,
    });
  }

  async update(
    id: number,
    updateSchedulingDto: UpdateSchedulingDto,
    token: string,
  ) {
    const returnToken = this.extractTokenFromHeader(token);
    const decoded: any = jwt.verify(returnToken, process.env.SECRET_KEY);
    if (!decoded) {
      throw new UnauthorizedException();
    }
    if (decoded.Role.includes('Coordenador')) {
      return await this.schedulingRepository.update(id, {
        data_agendamento: updateSchedulingDto.data_agendamento,
        idFisioterapeuta: updateSchedulingDto.idFisioterapeuta,
        idCoordenador: updateSchedulingDto.idCoordenador,
        status: 'Aceito',
      });
    }
    throw new UnauthorizedException();
  }

  async cancel(
    id: number,
    cancelSchedulingDto: CancelSchedulingDto,
    token: string,
  ) {
    const returnToken = this.extractTokenFromHeader(token);
    const decoded: any = jwt.verify(returnToken, process.env.SECRET_KEY);
    if (!decoded) {
      throw new UnauthorizedException();
    }
    if (decoded.Role.includes('Paciente')) {
      return await this.schedulingRepository.cancel(
        id,
        cancelSchedulingDto.motivo_cancelamento,
      );
    }
    throw new UnauthorizedException();
  }
}
