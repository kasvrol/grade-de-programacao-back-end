import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProgramaService {
  async fetchDataFromExternalApi(): Promise<any> {
    try {
      const id = 1337;
      const response = await axios.get(
        `https://epg-api.video.globo.com/programmes/${id}?date=2023-09-09`,
      );
      console.log('fez conexão');
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao consumir a API externa');
    }
  }
}
