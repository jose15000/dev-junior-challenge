import { checkinDTO } from "../../dtos/checkinDTO.js";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";

@Injectable()
export class PatientRepository {
    constructor (private readonly prisma: PrismaService) {}
    async createCheckin (patient: checkinDTO) {
        return this.prisma.checkIn.create({
            data: {
                cpf: patient.cpf,
                name: patient.name,
                birth: patient.birth,
            }
        })
    }

    async listQueue () {
        return this.prisma.checkIn.findMany({
            orderBy: {
                createdAt: 'asc',
            }
        })
    }

    async findByCpf (cpf: string) {
        return this.prisma.checkIn.findFirst({
            where: {
                cpf,
            }
        })
    }
}