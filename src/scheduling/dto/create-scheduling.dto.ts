import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateSchedulingDto {
  @IsString()
  pedido_medico: string;

  @IsBoolean()
  primeira_consulta: boolean;

  @IsNumber()
  idPaciente: number;
}
