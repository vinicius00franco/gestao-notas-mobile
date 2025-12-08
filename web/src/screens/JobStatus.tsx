import React from 'react';
import styled from 'styled-components';
import { jobs } from '../data/jobs';
import { JobStatusItem } from '../components/job/JobStatusItem';
import { SectionTitle } from '../components/ui/SectionTitle';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export function JobStatus() {
  return (
    <Stack>
      <SectionTitle>Status do Job</SectionTitle>
      {jobs.map((job) => (
        <JobStatusItem key={job.uuid} job={job} />
      ))}
    </Stack>
  );
}
