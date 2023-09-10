import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProgramaService {
  async requisitarDadosDaAPIGlobo(data): Promise<any> {
    try {
      const id = 1337;
      const response = await axios.get(
        `https://epg-api.video.globo.com/programmes/${id}?date=${data}`,
      );
      console.log('fez conexão');
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao consumir a API externa');
    }
  }

  async requisitarDadosESalvarNoBD(data): Promise<void> {
    try {
      const id = 1337;
      const response = await axios.get(
        `https://epg-api.video.globo.com/programmes/${id}?date=${data}`,
      );
      const programacao = response.data;
      console.log(programacao);
    } catch (error) {
      throw new Error(
        'Erro ao consumir a API externa e salvar os dados no banco de dados',
      );
    }
  }
}
