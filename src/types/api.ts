export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type JobStatus = {
  uuid: string;
  status: { codigo: string; descricao: string };
  dt_conclusao?: string | null;
  erro?: string | null;
  numero_nota?: string | null;
};

export type Lancamento = {
  uuid: string;
  descricao: string;
  valor: number;
  data_vencimento: string;
  data_pagamento: string | null;
  clf_tipo: any;
  clf_status: any;
  dt_criacao: string;
  dt_alteracao: string;
};

export type TopFornecedor = { nome: string; cnpj: string; total_a_pagar: number };

export type UnclassifiedCompany = {
  id: number;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone: string;
  email: string;
  classification: string;
};

export type NotaFiscal = {
  id: string;
  uuid: string; // use uuid provided by backend
  numero: string;
  valor: string | number;
  cnpj_emitente: string;
  nome_emitente: string;
  classificacao_id: string;
  valor_total: string | number;
  parceiro: {
    uuid: string;
    nome: string;
    cnpj: string;
  };
};

export type Classificacao = {
  id: string;
  nome: string;
};

// New dashboard types
export type DashboardKPIs = {
  nf_emitidas: number;
  nf_recebidas: number;
  valor_total_saida: number;
  impostos_retidos: number;
};

export type ChartDataPoint = { x: string | number; y: number };

export type ImpostoData = { tipo: string; valor: number; mes: string };

export type DashboardCharts = {
  tendencia_valor_imposto: { mes: string; valor_bruto: number; valor_impostos: number }[];
  distribuicao_impostos: ImpostoData[];
  volume_tipo_nf: { tipo: string; quantidade: number; mes: string }[];
};

export type AlertItem = {
  tipo: string;
  quantidade: number;
  descricao: string;
};

export type DashboardAlerts = AlertItem[];

export type RecentNF = {
  nome_razao_social: string;
  numero_data: string;
  valor: number;
  status: string;
};

export type DashboardFilters = {
  mes?: number;
  ano?: number;
  status?: string;
};

export type DashboardData = {
  kpis: DashboardKPIs;
  charts: DashboardCharts;
  alerts: DashboardAlerts;
  recent_nfs: RecentNF[];
  top_5_fornecedores_pendentes: TopFornecedor[]; // Keep existing
};