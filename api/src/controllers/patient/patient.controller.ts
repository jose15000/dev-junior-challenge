import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from '../../services/patient/patient.service.js';
import { checkinDTO } from '../../dtos/checkinDTO.js';

@Controller('patient')
export class PatientController {
    constructor (private patient: PatientService) {}
    @Post('checkin')
    async startCheckin(@Body() cpf: checkinDTO) {
        const startCheckin = await this.patient.startCheckIn(cpf);

        return startCheckin
    }
 }
