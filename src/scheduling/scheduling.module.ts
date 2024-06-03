import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PrismaModule } from 'src/modules/database/prisma.module';
import { SchedulingRepository } from './scheduling.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SchedulingController],
  providers: [SchedulingService, SchedulingRepository],
})
export class SchedulingModule {}
