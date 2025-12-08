import { JobStatus } from '../types';

export const jobs: JobStatus[] = [
  {
    uuid: 'job-001',
    status: 'PROCESSANDO',
    descricao: 'Lendo XML e preparando lançamentos',
    atualizadoEm: '2025-11-10T10:10:00Z',
  },
  {
    uuid: 'job-002',
    status: 'PENDENTE',
    descricao: 'Arquivo aguardando na fila',
    atualizadoEm: '2025-11-10T09:50:00Z',
  },
  {
    uuid: 'job-003',
    status: 'CONCLUIDO',
    descricao: 'Notas importadas com sucesso',
    atualizadoEm: '2025-11-09T18:00:00Z',
  },
  {
    uuid: 'job-004',
    status: 'ERRO',
    descricao: 'Falha ao ler QRCode',
    atualizadoEm: '2025-11-09T17:40:00Z',
  },
];
