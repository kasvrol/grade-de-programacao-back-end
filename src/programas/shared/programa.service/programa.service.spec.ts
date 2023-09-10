import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaService } from './programa.service';

describe('ProgramaService', () => {
  let provider: ProgramaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramaService],
    }).compile();

    provider = module.get<ProgramaService>(ProgramaService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
