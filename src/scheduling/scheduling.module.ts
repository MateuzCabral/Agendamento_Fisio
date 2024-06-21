import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PrismaModule } from 'src/modules/database/prisma.module';
import { SchedulingRepository } from './scheduling.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [SchedulingController],
  providers: [SchedulingService, SchedulingRepository],
})
export class SchedulingModule {}
