export type TopFornecedor = { nome: string; cnpj: string; total_a_pagar: number };

export type AlertItem = {
  tipo: string;
  quantidade: number;
  descricao: string;
};

export type RecentNF = {
  nome_razao_social: string;
  numero_data: string;
  valor: number;
  status: string;
};

export type DashboardKPIs = {
  nf_emitidas: number;
  nf_recebidas: number;
  valor_total_saida: number;
  impostos_retidos: number;
};

export type DashboardData = {
  kpis: DashboardKPIs;
  alerts: AlertItem[];
  recent_nfs: RecentNF[];
  top_5_fornecedores_pendentes: TopFornecedor[];
};

export type Lancamento = {
  uuid: string;
  descricao: string;
  valor: number;
  data_vencimento: string;
  data_pagamento: string | null;
  clf_tipo: { id: number; nome: string };
  clf_status: { id: number; nome: string };
  dt_criacao: string;
  dt_alteracao: string;
};

export type NotaFiscal = {
  uuid: string;
  numero: string;
  valor: number;
  cnpj_emitente: string;
  nome_emitente: string;
  status: 'Pago' | 'Pendente' | 'Cancelado';
};

export type JobStatus = {
  uuid: string;
  status: 'PENDENTE' | 'PROCESSANDO' | 'CONCLUIDO' | 'ERRO';
  descricao: string;
  atualizadoEm: string;
};
