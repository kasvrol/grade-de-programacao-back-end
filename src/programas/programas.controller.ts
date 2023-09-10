import { Controller, Get, Query, Post } from '@nestjs/common';
import { ProgramaService } from '../programas/shared/programa.service/programa.service';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly externalApiService: ProgramaService) {}

  @Get()
  async requisitarDadosDaAPIGlobo(@Query('data') data: string): Promise<any> {
    return this.externalApiService.requisitarDadosDaAPIGlobo(data);
  }

  @Post()
  async importarDadosDaAPIGlobo(@Query('data') data: string): Promise<void> {
    await this.externalApiService.requisitarDadosESalvarNoBD(data);
  }
}
