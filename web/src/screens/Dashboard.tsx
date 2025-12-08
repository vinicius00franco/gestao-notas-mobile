import React, { useState } from 'react';
import styled from 'styled-components';
import { dashboardData } from '../data/dashboard';
import { FilterBar } from '../components/dashboard/FilterBar';
import { KpiGrid } from '../components/dashboard/KpiGrid';
import { AlertCard } from '../components/dashboard/AlertCard';
import { RecentNFCard } from '../components/dashboard/RecentNFCard';
import { FornecedorCard } from '../components/dashboard/FornecedorCard';
import { HorizontalScroller } from '../components/ui/HorizontalScroller';
import { SectionTitle } from '../components/ui/SectionTitle';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export function Dashboard() {
  const [filters, setFilters] = useState({ mes: new Date().getMonth() + 1, ano: new Date().getFullYear(), status: '' });

  return (
    <Stack>
      <SectionTitle>Dashboard de Gestão de NF</SectionTitle>
      <FilterBar filters={filters} onChange={setFilters} />

      <KpiGrid kpis={dashboardData.kpis} />

      <div>
        <SectionTitle>Alertas Fiscais</SectionTitle>
        <HorizontalScroller>
          {dashboardData.alerts.map((alert, idx) => (
            <AlertCard key={idx} alert={alert} />
          ))}
        </HorizontalScroller>
      </div>

      <div>
        <SectionTitle>Notas Fiscais Recentes</SectionTitle>
        <HorizontalScroller>
          {dashboardData.recent_nfs.map((nota, idx) => (
            <RecentNFCard key={idx} nota={nota} />
          ))}
        </HorizontalScroller>
      </div>

      <div>
        <SectionTitle>Top 5 Fornecedores Pendentes</SectionTitle>
        <HorizontalScroller>
          {dashboardData.top_5_fornecedores_pendentes.map((fornecedor, idx) => (
            <FornecedorCard key={idx} fornecedor={fornecedor} />
          ))}
        </HorizontalScroller>
      </div>
    </Stack>
  );
}
