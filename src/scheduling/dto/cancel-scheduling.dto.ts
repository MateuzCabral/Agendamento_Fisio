import { IsString, IsNotEmpty } from 'class-validator';

export class CancelSchedulingDto {
  @IsNotEmpty()
  @IsString()
  motivo_cancelamento: string;
}
