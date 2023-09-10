import { Module } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { ProgramaService } from './shared/programa.service/programa.service';

@Module({
  controllers: [ProgramasController],
  providers: [ProgramaService],
})
export class ProgramasModule {}
