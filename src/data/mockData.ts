import { JobStatus, NotaFiscal, TopFornecedor, Lancamento, DashboardKPIs, DashboardCharts, DashboardAlerts, RecentNF, ImpostoData } from '../types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// --- Estado Simulado ---
export const mockJobsDB: JobStatus[] = [];
export const mockLancamentosDB: Lancamento[] = [];


// --- Tipos e Status ---
export const STATUS_OPTIONS = {
  PENDENTE: { codigo: 'PENDENTE', descricao: 'Aguardando processamento' },
  PROCESSANDO: { codigo: 'PROCESSANDO', descricao: 'Em processamento' },
  CONCLUIDO: { codigo: 'CONCLUIDO', descricao: 'Processamento concluído com sucesso' },
  ERRO: { codigo: 'ERRO', descricao: 'Falha ao processar a nota' },
};

// --- Gerador de Dados Mockados para Lançamentos ---
const generateMockLancamentos = () => {
  // Previne a duplicação de dados em hot-reloads
  if (mockLancamentosDB.length > 0) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const contasAPagar = [
    { desc: "Compra de Fertilizantes NPK", valor: 350.80, dia: 5 },
    { desc: "Sementes de Alface (5000 un)", valor: 120.00, dia: 8 },
    { desc: "Manutenção do Trator", valor: 550.00, dia: 15 },
    { desc: "Combustível para Maquinário", valor: 250.50, dia: 22 },
  ];

  const contasAReceber = [
    { desc: "Venda de 50 caixas de Alface", valor: 750.00, dia: 10 },
    { desc: "Pagamento - Supermercado X", valor: 1200.00, dia: 18 },
    { desc: "Venda de 100kg de Caqui Fuyu", valor: 450.75, dia: 25 },
    { desc: "Pagamento - Atacadista Y", valor: 980.60, dia: 28 },
  ];

  contasAPagar.forEach(conta => {
    const vencimento = new Date(year, month, conta.dia).toISOString().split('T')[0];
    mockLancamentosDB.push({
      uuid: uuidv4(),
      descricao: conta.desc,
      valor: conta.valor,
      data_vencimento: vencimento,
      data_pagamento: null,
      clf_tipo: { nome: 'A Pagar' },
      clf_status: { nome: 'Pendente' },
      dt_criacao: today.toISOString(),
      dt_alteracao: today.toISOString(),
    });
  });

  contasAReceber.forEach(conta => {
    const vencimento = new Date(year, month, conta.dia).toISOString().split('T')[0];
    mockLancamentosDB.push({
      uuid: uuidv4(),
      descricao: conta.desc,
      valor: conta.valor,
      data_vencimento: vencimento,
      data_pagamento: null,
      clf_tipo: { nome: 'A Receber' },
      clf_status: { nome: 'Pendente' },
      dt_criacao: today.toISOString(),
      dt_alteracao: today.toISOString(),
    });
  });
};

// Gera os dados iniciais ao carregar o módulo
generateMockLancamentos();


// --- Fábricas de Dados Mockados ---

/**
 * Cria um novo job com status PENDENTE.
 */
export const createMockJob = (): JobStatus => {
  return {
    uuid: uuidv4(),
    status: STATUS_OPTIONS.PENDENTE,
  };
};

/**
 * Simula a extração de dados de uma nota fiscal.
 */
export const extractMockNotaData = (): Partial<NotaFiscal> & { success: boolean, partial: boolean, error?: string } => {
  const random = Math.random();

  if (random < 0.2) {
    return { success: false, partial: false, error: 'QR code ilegível.' };
  }

  if (random < 0.5) {
    return { success: true, partial: true, numero: '12345', nome_emitente: 'Fornecedor Parcial', valor_total: 150.75 };
  }

  return { success: true, partial: false, numero: '98765', cnpj_emitente: '12.345.678/0001-99', nome_emitente: 'Empresa Completa', valor_total: 1234.56 };
};

/**
 * Gera dados mockados para o dashboard.
 */
export const createMockDashboardData = (jobs: JobStatus[]) => {
  const stats = {
    concluidos: jobs.filter(j => j.status.codigo === 'CONCLUIDO').length,
    erros: jobs.filter(j => j.status.codigo === 'ERRO').length,
    pendentes: jobs.filter(j => j.status.codigo === 'PENDENTE').length,
    processando: jobs.filter(j => j.status.codigo === 'PROCESSANDO').length,
  };

  const topFornecedores: TopFornecedor[] = [
    { nome: 'Hortifruti São João', cnpj: '12.345.678/0001-90', total_a_pagar: 2850.75 },
    { nome: 'Verduras do Campo', cnpj: '23.456.789/0001-01', total_a_pagar: 1920.40 },
    { nome: 'CEAGESP - Mercado Livre', cnpj: '34.567.890/0001-12', total_a_pagar: 1580.25 },
    { nome: 'Embalagens Silva', cnpj: '45.678.901/0001-23', total_a_pagar: 890.50 },
    { nome: 'Transportadora Verde', cnpj: '56.789.012/0001-34', total_a_pagar: 650.00 },
  ];

  // New NF dashboard data
  const kpis: DashboardKPIs = {
    nf_emitidas: 1800,
    nf_recebidas: 210,
    valor_total_saida: 150000,
    impostos_retidos: 11000,
  };

  const charts: DashboardCharts = generateMockCharts();

  const alerts: DashboardAlerts = [
    { tipo: 'NF-e Vencida', quantidade: 5, descricao: 'Notas com prazo de pagamento/recebimento vencido.' },
    { tipo: 'Divergência de XML', quantidade: 3, descricao: 'NFs de entrada que o valor do XML não bate com o valor lançado no sistema.' },
    { tipo: 'Maior Emitente', quantidade: 1, descricao: 'Empresa X gerou o maior volume de NF no período.' },
  ];

  const recentNfs: RecentNF[] = generateMockRecentNFs();

  return {
    stats,
    top_5_fornecedores_pendentes: topFornecedores,
    economia_gerada: 450.23,
    total_processado: jobs.length,
    kpis,
    charts,
    alerts,
    recent_nfs: recentNfs,
  };
};

/**
 * Gera dados mockados para os gráficos do dashboard.
 */
const generateMockCharts = (): DashboardCharts => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const tendenciaValorImposto = months.map((mes, idx) => ({
    mes,
    valor_bruto: 10000 + idx * 2000 + Math.random() * 5000,
    valor_impostos: 800 + idx * 150 + Math.random() * 500,
  }));

  const distribuicaoImpostos: ImpostoData[] = [];
  months.forEach(mes => {
    ['ICMS', 'PIS', 'COFINS', 'IRRF', 'INSS'].forEach(tipo => {
      distribuicaoImpostos.push({
        tipo,
        valor: Math.random() * 2000 + 500,
        mes,
      });
    });
  });

  const volumeTipoNf: { tipo: string; quantidade: number; mes: string }[] = [];
  months.forEach(mes => {
    volumeTipoNf.push({
      tipo: 'Saída',
      quantidade: 120 + Math.floor(Math.random() * 50),
      mes,
    });
    volumeTipoNf.push({
      tipo: 'Entrada',
      quantidade: 15 + Math.floor(Math.random() * 10),
      mes,
    });
  });

  return {
    tendencia_valor_imposto: tendenciaValorImposto,
    distribuicao_impostos: distribuicaoImpostos,
    volume_tipo_nf: volumeTipoNf,
  };
};

/**
 * Gera dados mockados para NFs recentes.
 */
const generateMockRecentNFs = (): RecentNF[] => {
  const statuses = ['Pendente', 'Pago', 'Cancelado'];
  const companies = ['João Silva', 'Empresa ABC', 'Fornecedor XYZ', 'Cliente 123', 'Parceiro DEF'];

  return Array.from({ length: 10 }, (_, i) => ({
    nome_razao_social: companies[Math.floor(Math.random() * companies.length)],
    numero_data: `NF ${1000 + i} - ${new Date().toLocaleDateString('pt-BR')}`,
    valor: Math.random() * 5000 + 500,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};
