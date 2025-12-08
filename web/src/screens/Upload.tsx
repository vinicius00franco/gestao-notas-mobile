import React from 'react';
import styled from 'styled-components';
import { UploadCard } from '../components/upload/UploadCard';
import { SectionTitle } from '../components/ui/SectionTitle';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export function Upload() {
  const handleSubmit = (payload: { cnpj: string; fileName?: string }) => {
    alert(`Nota enviada!${payload.fileName ? ` Arquivo: ${payload.fileName}` : ''}`);
  };

  return (
    <Stack>
      <SectionTitle>Upload de Nota Fiscal</SectionTitle>
      <UploadCard onSubmit={handleSubmit} />
    </Stack>
  );
}
