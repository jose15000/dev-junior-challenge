import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PatientController } from './checkin.controller.js';
import { PatientService } from '../../services/patient/patient.service.js';

describe('PatientController', () => {
  let controller: PatientController;
  let service: {
    startCheckIn: ReturnType<typeof vi.fn>;
    listCheckIns: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    service = {
      startCheckIn: vi.fn(),
      listCheckIns: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar startCheckIn com o body recebido', async () => {
    const mockDto = { cpf: '11111111111', name: '', birth: '' };
    const mockResponse = { id: '1', ...mockDto, createdAt: new Date() };
    service.startCheckIn.mockResolvedValue(mockResponse);

    const result = await controller.startCheckin(mockDto);

    expect(service.startCheckIn).toHaveBeenCalledWith(mockDto);
    expect(result).toEqual(mockResponse);
  });

  it('deve chamar listCheckIns para buscar a fila', async () => {
    const mockList = [{ id: '1', cpf: '11111111111', name: 'Ana', birth: '', createdAt: new Date() }];
    service.listCheckIns.mockResolvedValue(mockList);

    const result = await controller.getQueue();

    expect(service.listCheckIns).toHaveBeenCalled();
    expect(result).toEqual(mockList);
  });
});
