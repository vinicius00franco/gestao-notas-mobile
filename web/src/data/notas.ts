import { NotaFiscal } from '../types';

export const notas: NotaFiscal[] = [
  {
    uuid: 'nf-001',
    numero: '1234',
    valor: 2350.55,
    cnpj_emitente: '12.345.678/0001-90',
    nome_emitente: 'Hortifruti São João',
    status: 'Pago',
  },
  {
    uuid: 'nf-002',
    numero: '4431',
    valor: 820,
    cnpj_emitente: '23.456.789/0001-01',
    nome_emitente: 'Verduras do Campo',
    status: 'Pendente',
  },
  {
    uuid: 'nf-003',
    numero: '9821',
    valor: 640.75,
    cnpj_emitente: '45.678.901/0001-23',
    nome_emitente: 'Embalagens Silva',
    status: 'Cancelado',
  },
];
