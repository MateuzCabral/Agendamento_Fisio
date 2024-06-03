import { PartialType } from '@nestjs/mapped-types';
import { CreateSchedulingDto } from './create-scheduling.dto';
import { IsDate, IsNumber } from 'class-validator';

export class UpdateSchedulingDto extends PartialType(CreateSchedulingDto) {
  @IsDate()
  data_agendamento: Date;

  @IsNumber()
  idFisioterapeuta: number;

  @IsNumber()
  idCoordenador: number;
}
