import { Controller, Query, Post, Get, Param } from '@nestjs/common';
import { ProgramaService } from '../programas/shared/programa.service/programa.service';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly ApiDeProgramacaoGlobo: ProgramaService) {}

  @Get(':data')
  async buscarDadosPorData(@Param('data') data: string) {
    const dados =
      await this.ApiDeProgramacaoGlobo.requisitarDadosDaAPIGlobo(data);
    return dados;
  }

  @Post()
  async importarDadosDaAPIGlobo(@Query('data') data: string): Promise<void> {
    await this.ApiDeProgramacaoGlobo.requisitarDadosESalvarNoBD(data);
  }
}
