import { Module } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { ProgramaService } from './shared/programa.service/programa.service';
import { PrismaService } from '../database/PrismaService';

@Module({
  controllers: [ProgramasController],
  providers: [ProgramaService, PrismaService],
})
export class ProgramasModule {}
