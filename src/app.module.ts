import { Module } from '@nestjs/common';
import { PrismaService } from './modules/database/prisma.service';
import { PrismaModule } from './modules/database/prisma.module';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [PrismaModule, SchedulingModule],
  providers: [PrismaService],
})
export class AppModule {}
