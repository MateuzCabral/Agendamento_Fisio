import { PartialType } from '@nestjs/mapped-types';
import { CreateSchedulingDto } from './create-scheduling.dto';
import { IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSchedulingDto extends PartialType(CreateSchedulingDto) {
  @Type(() => Date)
  @IsDate()
  data_agendamento: Date;

  @IsInt()
  idFisioterapeuta: number;

  @IsInt()
  idCoordenador: number;
}
