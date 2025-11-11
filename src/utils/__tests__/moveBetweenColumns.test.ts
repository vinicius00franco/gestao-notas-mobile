import { moveNotaBetweenColumns, KanbanColumnData } from '../moveBetweenColumns';
import { NotaFiscal } from '@/types';

const nf = (uuid: string, numero: string): NotaFiscal => ({
  uuid,
  id: uuid,
  numero,
  valor: 0,
  valor_total: 0,
  cnpj_emitente: '00.000.000/0000-00',
  nome_emitente: 'Emitente',
  classificacao_id: 'x',
  parceiro: { uuid: 'p1', nome: 'Parceiro', cnpj: '00.000.000/0000-00' },
});

const makeColumns = (): KanbanColumnData[] => [
  { id: 'c1', nome: 'Coluna 1', notas: [nf('1', '001'), nf('2', '002'), nf('3', '003')] },
  { id: 'c2', nome: 'Coluna 2', notas: [nf('4', '004')] },
];

describe('moveNotaBetweenColumns', () => {
  it('moves within same column (reorder)', () => {
    const cols = makeColumns();
    const result = moveNotaBetweenColumns(cols, { fromColumnIndex: 0, fromIndex: 0, toColumnIndex: 0, toIndex: 2 });
    expect(result[0].notas.map(n => n.uuid)).toEqual(['2', '3', '1']);
    // immutability
    expect(cols[0].notas.map(n => n.uuid)).toEqual(['1', '2', '3']);
  });

  it('moves to different column', () => {
    const cols = makeColumns();
    const result = moveNotaBetweenColumns(cols, { fromColumnIndex: 0, fromIndex: 1, toColumnIndex: 1, toIndex: 1 });
    expect(result[0].notas.map(n => n.uuid)).toEqual(['1', '3']);
    expect(result[1].notas.map(n => n.uuid)).toEqual(['4', '2']);
  });

  it('clamps invalid indices and returns original when out of bounds', () => {
    const cols = makeColumns();
    const result1 = moveNotaBetweenColumns(cols, { fromColumnIndex: 5, fromIndex: 0, toColumnIndex: 0, toIndex: 0 });
    expect(result1).toBe(cols);
    const result2 = moveNotaBetweenColumns(cols, { fromColumnIndex: 0, fromIndex: 99, toColumnIndex: 0, toIndex: 0 });
    expect(result2).toBe(cols);
  });
});
