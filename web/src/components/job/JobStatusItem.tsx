import React from 'react';
import styled from 'styled-components';
import { JobStatus } from '../../types';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

const Meta = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

type Props = { job: JobStatus };

export function JobStatusItem({ job }: Props) {
  const tone = job.status === 'CONCLUIDO' ? 'success' : job.status === 'ERRO' ? 'error' : 'info';

  return (
    <Card>
      <Title>Job {job.uuid}</Title>
      <Tag tone={tone}>{job.status}</Tag>
      <Meta>{job.descricao}</Meta>
      <Meta>Atualizado: {new Date(job.atualizadoEm).toLocaleString('pt-BR')}</Meta>
    </Card>
  );
}
