import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  UseInterceptors,
  UploadedFile,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { CancelSchedulingDto } from './dto/cancel-scheduling.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('agendamentos')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Get()
  findAll() {
    return this.schedulingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.schedulingService.findOne(+id);
  }

  @Get('/paciente/:id')
  findByPaciente(@Param('id') id: number) {
    return this.schedulingService.findByPaciente(+id);
  }

  @Get('/fisio/:id')
  findByFisio(@Param('id') id: number) {
    return this.schedulingService.findByFisio(+id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('pedido_medico', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new UnauthorizedException();
    }
    const filePath = file.filename;
    return this.schedulingService.create(filePath, token);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Headers('authorization') token: string,
    @Body() updateSchedulingDto: UpdateSchedulingDto,
  ) {
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.schedulingService.update(+id, updateSchedulingDto, token);
  }

  @Patch('/cancel/:id')
  cancel(
    @Param('id') id: number,
    @Headers('authorization') token: string,
    @Body()
    cancelSchedulingDto: CancelSchedulingDto,
  ) {
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.schedulingService.cancel(+id, cancelSchedulingDto, token);
  }
}
