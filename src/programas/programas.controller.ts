import { Controller, Get } from '@nestjs/common';
import { ProgramaService } from '../programas/shared/programa.service/programa.service';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly externalApiService: ProgramaService) {}

  @Get()
  async fetchDataFromExternalApi(): Promise<any> {
    return this.externalApiService.fetchDataFromExternalApi();
  }
}
