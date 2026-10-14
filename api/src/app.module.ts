import { Module } from '@nestjs/common';
import { PrismaModule } from './repositories/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

