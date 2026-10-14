import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { PatientService } from './patient.service.js';
import { PatientRepository } from '../../repositories/patient/patient.repository.js';

describe('PatientService', () => {
  let service: PatientService;
  const repository = {
    findByCpf: vi.fn(),
    createCheckin: vi.fn(),
    listQueue: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        { provide: PatientRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    process.env.CADASTRO_URL = 'http://localhost:4000';
  });

  afterEach(() => vi.restoreAllMocks());

  it('deve realizar check-in com sucesso', async () => {
    repository.findByCpf.mockResolvedValue(null);
    repository.createCheckin.mockResolvedValue({ id: '1', cpf: '11111111111', name: 'Ana Souza' });

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({ cpf: '11111111111', nome: 'Ana Souza', dataNascimento: '1988-03-12' }),
    } as Response);

    const result = await service.startCheckIn({ cpf: '11111111111', name: '', birth: '' });
    expect(result.cpf).toBe('11111111111');
  });

  it('deve lançar erro se o CPF não existir no cadastro', async () => {
    repository.findByCpf.mockResolvedValue(null);
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ status: 404, ok: false } as Response);

    await expect(service.startCheckIn({ cpf: '99999999999', name: '', birth: '' }))
      .rejects.toThrow(NotFoundException);
  });

  it('deve lançar erro se o CPF já tiver check-in', async () => {
    repository.findByCpf.mockResolvedValue({ id: '1', cpf: '11111111111' });

    await expect(service.startCheckIn({ cpf: '11111111111', name: '', birth: '' }))
      .rejects.toThrow(ConflictException);
  });
});
