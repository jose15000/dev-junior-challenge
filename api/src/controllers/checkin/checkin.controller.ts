import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from '../../services/patient/patient.service.js';
import { checkinDTO } from '../../dtos/checkinDTO.js';

@Controller('checkin')
export class PatientController {
    constructor (private patient: PatientService) {}
    @Post('start')
    async startCheckin(@Body() cpf: checkinDTO) {
        const startCheckin = await this.patient.startCheckIn(cpf);
        return startCheckin
    }

    @Get('listCheckins')
    async getQueue() {
        const getQueue = await this.patient.listCheckIns();
        return getQueue
    }
 }
