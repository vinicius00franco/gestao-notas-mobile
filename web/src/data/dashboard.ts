import { DashboardData } from '../types';

export const dashboardData: DashboardData = {
  kpis: {
    nf_emitidas: 1800,
    nf_recebidas: 210,
    valor_total_saida: 150000,
    impostos_retidos: 11000,
  },
  alerts: [
    { tipo: 'NF-e Vencida', quantidade: 5, descricao: 'Notas com prazo de pagamento/recebimento vencido.' },
    { tipo: 'Divergência de XML', quantidade: 3, descricao: 'Entrada com valor que não bate com o XML.' },
    { tipo: 'Maior Emitente', quantidade: 1, descricao: 'Empresa X gerou o maior volume de NF no período.' },
  ],
  recent_nfs: [
    { nome_razao_social: 'Hortifruti São João', numero_data: 'NF 1234 • 10/11', valor: 2350.55, status: 'Pago' },
    { nome_razao_social: 'Verduras do Campo', numero_data: 'NF 4431 • 09/11', valor: 820.0, status: 'Pendente' },
    { nome_razao_social: 'Embalagens Silva', numero_data: 'NF 9821 • 08/11', valor: 640.75, status: 'Cancelado' },
  ],
  top_5_fornecedores_pendentes: [
    { nome: 'Hortifruti São João', cnpj: '12.345.678/0001-90', total_a_pagar: 2850.75 },
    { nome: 'Verduras do Campo', cnpj: '23.456.789/0001-01', total_a_pagar: 1920.4 },
    { nome: 'CEAGESP - Mercado Livre', cnpj: '34.567.890/0001-12', total_a_pagar: 1580.25 },
    { nome: 'Embalagens Silva', cnpj: '45.678.901/0001-23', total_a_pagar: 890.5 },
    { nome: 'Transportadora Verde', cnpj: '56.789.012/0001-34', total_a_pagar: 650 },
  ],
};
