import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramasModule } from './programas/programas.module';

@Module({
  imports: [ProgramasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
