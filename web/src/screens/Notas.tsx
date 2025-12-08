import React from 'react';
import styled from 'styled-components';
import { notas } from '../data/notas';
import { NotaListItem } from '../components/notas/NotaListItem';
import { SectionTitle } from '../components/ui/SectionTitle';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export function Notas() {
  return (
    <Stack>
      <SectionTitle>Notas Fiscais</SectionTitle>
      {notas.map((nota) => (
        <NotaListItem key={nota.uuid} nota={nota} />
      ))}
    </Stack>
  );
}
