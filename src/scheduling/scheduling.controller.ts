import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';

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
  create(@Body() createSchedulingDto: CreateSchedulingDto) {
    return this.schedulingService.create(createSchedulingDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateSchedulingDto: UpdateSchedulingDto,
  ) {
    return this.schedulingService.update(+id, updateSchedulingDto);
  }
}
