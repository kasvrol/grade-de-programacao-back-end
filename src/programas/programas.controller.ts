import {
  Controller,
  Get,
  Query,
  Post,
  Param,
  Res,
  HttpStatus,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { ProgramaService } from '../programas/shared/programa.service/programa.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly ApiDeProgramacaoGlobo: ProgramaService) {}

  @Get(':data')
  async buscarDadosPorData(
    @Param('data') data: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.ApiDeProgramacaoGlobo.requisitarDadosDaAPIGlobo(data)
      .then((dados) => {
        return res.status(HttpStatus.OK).json({ programme: dados });
      })
      .catch(() => {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ mensagem: 'Programação já existe' });
      });
  }

  @Post()
  async importarDadosDaAPIGlobo(
    @Query('data') data: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.ApiDeProgramacaoGlobo.requisitarDadosESalvarNoBD(data)
      .then(() => {
        return res
          .status(HttpStatus.OK)
          .json({ mensagem: 'Programação foi registrada com sucesso' });
      })
      .catch(() => {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ mensagem: 'Programação já existe' });
      });
  }

  @Put(':data')
  async atualizarDadosPorData(
    @Param('data') dataDaProgramacao: string,
    @Res() res: Response,
    @Body() dados: Prisma.programmeUpdateInput,
  ): Promise<void> {
    await this.ApiDeProgramacaoGlobo.atualizarProgramacaoDoBD(
      dataDaProgramacao,
      dados,
    )
      .then(() => {
        return res
          .status(HttpStatus.OK)
          .json({ mensagem: 'Programação atualizada com sucesso' });
      })
      .catch(() => {
        return res.status(HttpStatus.NOT_FOUND).json({
          mensagem: 'A programação ainda não existe para ser atualizada',
        });
      });
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
