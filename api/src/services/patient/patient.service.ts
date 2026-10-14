import {
    BadGatewayException,
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { PatientRepository } from '../../repositories/patient/patient.repository.js';
import { checkinDTO } from '../../dtos/checkinDTO.js';

@Injectable()
export class PatientService {
    private readonly logger = new Logger(PatientService.name);

    constructor (private readonly patientRepository: PatientRepository) {}

    async startCheckIn (patient: checkinDTO) {

        try {
            const existingCheckin = await this.patientRepository.findByCpf(patient.cpf);
            if (existingCheckin) {
                throw new ConflictException("Paciente já possui um check-in registrado!");
            }

            const checkPatient = await fetch(`${process.env.CADASTRO_URL}/pacientes/${patient.cpf}`);
    
            if(checkPatient.status === 404) throw new NotFoundException("Paciente não encontrado!");

            if (!checkPatient.ok) {
                throw new BadGatewayException("Erro ao consultar o serviço de cadastro de pacientes.");
            }
            
            const patientData = await checkPatient.json();

            const savePatient = await this.patientRepository.createCheckin({
                cpf: patientData.cpf,
                name: patientData.nome,
                birth: patientData.dataNascimento
            });

            return savePatient;

        } catch (error: unknown) {
            if (error instanceof HttpException) {
                throw error;
            }

            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            this.logger.error(`Erro ao realizar check-in para CPF ${patient.cpf}: ${errorMessage}`);

            if (error instanceof Error && errorMessage.includes('fetch failed')) {
                throw new ServiceUnavailableException("Serviço de cadastro de pacientes indisponível no momento.");
            }

            throw new InternalServerErrorException("Erro interno ao processar o check-in.");
        }
    }

    async listCheckIns () {
        try {
            const checkinQueue = await this.patientRepository.listQueue();
            return checkinQueue;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            this.logger.error(`Erro ao listar fila de check-ins: ${errorMessage}`);
            throw new InternalServerErrorException("Erro interno ao buscar a fila de check-ins.");
        }
    }
}
