import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ProgramaService {
  constructor(private readonly prisma: PrismaService) {}

  async requisitarDadosDaAPIGlobo(data: string): Promise<any> {
    try {
      const dados = await this.prisma.programme.findUnique({
        where: {
          date: data,
        },
        include: {
          entries: {
            include: {
              custom_info: {
                include: {
                  Graficos: {
                    include: {
                      Confronto: {
                        include: {
                          Oponente: true,
                        },
                      },
                    },
                  },
                  Resumo: true,
                },
              },
              program: true,
            },
          },
        },
      });
      console.log(dados);
      return dados;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar dados no banco de dados');
    }
  }

  async requisitarDadosESalvarNoBD(data: string): Promise<number> {
    try {
      const id = 1337;
      const response = await axios.get(
        `https://epg-api.video.globo.com/programmes/${id}?date=${data}`,
      );
      const programacao = response.data;

      const entries = [];

      for (const dadosEntry of programacao.programme.entries) {
        const dadosCustomInfo = dadosEntry.custom_info;

        const customInfo = await this.prisma.customInfo.create({
          data: {
            Diretor: dadosCustomInfo?.Diretor || null,
            BaseUTCOffset: dadosCustomInfo?.BaseUTCOffset || null,
            Graficos: {
              create: {
                URL: dadosCustomInfo?.Graficos?.URL || null,
                Trailler: dadosCustomInfo?.Graficos?.Trailler || null,
                ImagemURL: dadosCustomInfo?.Graficos?.ImagemURL || null,
                PosterURL: dadosCustomInfo?.Graficos?.PosterURL || null,
                LogoURL: dadosCustomInfo?.Graficos?.LogoURL || null,
                Confronto: {
                  create: {
                    Oponente: {
                      create: [
                        {
                          Nome:
                            dadosCustomInfo?.Graficos?.Confronto?.Oponente[0]
                              ?.Nome || null,
                          URL:
                            dadosCustomInfo?.Graficos?.Confronto?.Oponente[0]
                              ?.URL || null,
                          ImagemURL:
                            dadosCustomInfo?.Graficos?.Confronto?.Oponente[0]
                              ?.ImagemURL || null,
                        },
                        {
                          Nome:
                            dadosCustomInfo?.Graficos?.Confronto?.Oponente[1]
                              ?.Nome || null,
                          URL:
                            dadosCustomInfo?.Graficos?.Confronto?.Oponente[1]
                              ?.URL || null,
                          ImagemURL:
                            dadosCustomInfo?.Graficos?.Confronto?.Oponente[1]
                              ?.ImagemURL || null,
                        },
                      ],
                    },
                  },
                },
              },
            },
            Resumo: {
              create: {
                Sinopse: dadosCustomInfo?.Resumo?.Sinopse || null,
                ResumoImprensa: dadosCustomInfo?.Resumo?.ResumoImprensa || null,
                Destaque: dadosCustomInfo?.Resumo?.Destaque || null,
              },
            },
            Elenco: dadosCustomInfo?.Elenco || null,
            Pais: dadosCustomInfo?.Pais || null,
            Classe: dadosCustomInfo?.Classe || null,
            TituloOriginal: dadosCustomInfo?.TituloOriginal || null,
            Dublador: dadosCustomInfo?.Dublador || null,
            URLPrograma: dadosCustomInfo?.URLPrograma || null,
            Video: dadosCustomInfo?.Video || null,
            ClosedCaption: dadosCustomInfo?.ClosedCaption || null,
          },
        });

        const programa = await this.prisma.program.create({
          data: {
            name: dadosEntry?.program.name,
            category: dadosEntry?.program.category || null,
            parental_guide: dadosEntry?.program.parental_guide || null,
            webmedia_program_id:
              dadosEntry?.program.webmedia_program_id || null,
          },
        });

        const entry = await this.prisma.entry.create({
          data: {
            media_id: dadosEntry.media_id || null,
            title: dadosEntry.title || null,
            description: dadosEntry.description || null,
            webmedia_title_id: dadosEntry.webmedia_title_id || null,
            start_time: dadosEntry.start_time,
            end_time: dadosEntry.end_time,
            human_start_time: dadosEntry.human_start_time || null,
            human_end_time: dadosEntry.human_end_time || null,
            duration_in_minutes: dadosEntry.duration_in_minutes || null,
            live_broadcast: dadosEntry.live_broadcast,
            custom_info: {
              connect: { id: customInfo.id },
            },
            program: {
              connect: { id: programa.id },
            },
          },
        });

        entries.push({ id: entry.id });
      }

      const newProgramme = await this.prisma.programme.create({
        data: {
          date: data,
          entries: {
            connect: entries.map((entry) => ({ id: entry.id })),
          },
        },
      });

      return newProgramme.id;
    } catch (error) {
      console.log(error);
      throw new Error(
        'Erro ao consumir a API externa e salvar os dados no banco de dados',
      );
    }
  }

  async removerProgramacaoDoBD(data: string): Promise<any> {
    const programacao = await this.prisma.programme.findUnique({
      where: {
        date: data,
      },
    });

    if (!programacao) {
      throw new Error('A programação desta data não existe');
    }

    await this.prisma.programme.delete({ where: { date: data } });
  }
}
