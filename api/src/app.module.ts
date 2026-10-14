import { Module } from '@nestjs/common';
import { PrismaModule } from './repositories/prisma.module.js';
import { PatientController } from './controllers/checkin/checkin.controller.js';
import { PatientService } from './services/patient/patient.service.js';
import { PatientRepository } from './repositories/patient/patient.repository.js';

@Module({
  imports: [PrismaModule],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
})
export class AppModule {}
