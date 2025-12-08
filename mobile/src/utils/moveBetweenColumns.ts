import { NotaFiscal } from '@/types';

export interface KanbanColumnData {
  id: string;
  nome: string;
  notas: NotaFiscal[];
}

export interface MoveSpec {
  fromColumnIndex: number;
  fromIndex: number;
  toColumnIndex: number;
  toIndex: number;
}

// Pure function: returns a new columns array with the nota moved.
export function moveNotaBetweenColumns(
  columns: KanbanColumnData[],
  { fromColumnIndex, fromIndex, toColumnIndex, toIndex }: MoveSpec
): KanbanColumnData[] {
  if (
    fromColumnIndex < 0 ||
    fromColumnIndex >= columns.length ||
    toColumnIndex < 0 ||
    toColumnIndex >= columns.length
  ) {
    return columns;
  }

  if (fromIndex < 0 || fromIndex >= columns[fromColumnIndex].notas.length) {
    return columns;
  }

  const next = columns.map((c) => ({ ...c, notas: [...c.notas] }));
  const [moved] = next[fromColumnIndex].notas.splice(fromIndex, 1);

  const insertionIndex = Math.min(
    Math.max(0, toIndex),
    next[toColumnIndex].notas.length
  );

  next[toColumnIndex].notas.splice(insertionIndex, 0, moved);
  return next;
}
