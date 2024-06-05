import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateSchedulingDto {
  @IsNotEmpty()
  data_agendamento: Date;

  @IsNotEmpty()
  @IsInt()
  idFisioterapeuta: number;

  @IsInt()
  idCoordenador: number;
}
