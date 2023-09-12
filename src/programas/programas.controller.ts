import {
  Controller,
  Get,
  Query,
  Post,
  Param,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ProgramaService } from '../programas/shared/programa.service/programa.service';
import { Response } from 'express';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly ApiDeProgramacaoGlobo: ProgramaService) {}

  @Get(':data')
  async buscarDadosPorData(
    @Param('data') data: string,
    @Res() res: Response,
  ): Promise<Response> {
    const dados =
      await this.ApiDeProgramacaoGlobo.requisitarDadosDaAPIGlobo(data);

    if (dados) {
      return res.status(HttpStatus.OK).json({ programme: dados });
    }

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ mensagem: 'A programação desta data não foi criada ainda' });
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

  @Delete(':data')
  async removerProgramacao(
    @Param('data') data: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.ApiDeProgramacaoGlobo.removerProgramacaoDoBD(data)
      .then(() => {
        return res
          .status(HttpStatus.OK)
          .json({ mensagem: 'Programação foi deletada com sucesso' });
      })
      .catch(() => {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ mensagem: 'Programação não foi encontrada' });
      });
  }
}
