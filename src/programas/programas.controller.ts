import { Controller, Query, Post } from '@nestjs/common';
import { ProgramaService } from '../programas/shared/programa.service/programa.service';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly ApiDeProgramacaoGlobo: ProgramaService) {}

  @Post()
  async importarDadosDaAPIGlobo(@Query('data') data: string): Promise<void> {
    await this.ApiDeProgramacaoGlobo.requisitarDadosESalvarNoBD(data);
  }
}
