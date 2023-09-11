import {
  Controller,
  Get,
  Query,
  Post,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProgramaService } from '../programas/shared/programa.service/programa.service';
import { Response } from 'express';

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
  async importarDadosDaAPIGlobo(
    @Query('data') data: string,
    @Res() res: Response,
  ): Promise<Response> {
    const verificaProgramacao =
      await this.ApiDeProgramacaoGlobo.requisitarDadosDaAPIGlobo(data);

    if (verificaProgramacao) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ mensagem: 'A programação desta data já existe' });
    }

    await this.ApiDeProgramacaoGlobo.requisitarDadosESalvarNoBD(data);
    return res
      .status(HttpStatus.CREATED)
      .json({ mensagem: 'Programação criada com sucesso' });
  }
}
