import React from 'react';
import { render } from '@testing-library/react-native';
import DashboardSummary from '../DashboardSummary';
import { DashboardData } from '../../../types';

const mockData: DashboardData = {
  top_5_fornecedores_pendentes: [],
  kpis: {
    nf_emitidas: 1800,
    nf_recebidas: 210,
    valor_total_saida: 150000,
    impostos_retidos: 11000,
  },
  charts: {
    tendencia_valor_imposto: [
      { mes: 'Jan', valor_bruto: 10000, valor_impostos: 800 },
      { mes: 'Fev', valor_bruto: 12000, valor_impostos: 900 },
    ],
    distribuicao_impostos: [],
    volume_tipo_nf: [],
  },
  alerts: [],
  recent_nfs: [],
};

describe('DashboardSummary', () => {
  it('renders KPIs and chart', () => {
    const { getByText } = render(<DashboardSummary data={mockData} />);

    expect(getByText('Resumos')).toBeTruthy();
    expect(getByText('NF Emitidas')).toBeTruthy();
    expect(getByText('1800')).toBeTruthy();
    expect(getByText('NF Recebidas')).toBeTruthy();
    expect(getByText('210')).toBeTruthy();
    expect(getByText('Valor Total NF Saída')).toBeTruthy();
    expect(getByText('R$ 150K')).toBeTruthy();
    expect(getByText('Impostos Retidos')).toBeTruthy();
    expect(getByText('R$ 11K')).toBeTruthy();

    expect(getByText('Tendência de Valores por Mês')).toBeTruthy();
    expect(getByText('Valor Bruto Mensal')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<DashboardSummary data={mockData} />);

    expect(toJSON()).toMatchSnapshot();
  });
});