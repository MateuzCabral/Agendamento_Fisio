import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateSchedulingDto {
  @IsString()
  pedido_medico: string;

  @IsBoolean()
  primeira_consulta: boolean;

  @IsInt()
  idPaciente: number;
}
