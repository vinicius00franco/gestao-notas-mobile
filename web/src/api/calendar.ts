// Mock API for Calendar
import { v4 as uuidv4 } from 'uuid';

export const fetchEvents = async (): Promise<Record<string, any[]>> => {
    const data = localStorage.getItem('calendarEvents');
    return data ? JSON.parse(data) : {};
};

export interface Lancamento {
    uuid: string;
    descricao: string;
    valor: number;
    data_vencimento: string;
    data_pagamento: string | null;
    clf_tipo: { nome: 'A Pagar' | 'A Receber' };
    clf_status: { nome: string };
    dt_criacao: string;
    dt_alteracao: string;
    // Specific for calendar day view
    nome_fantasia?: string;
    cnpj?: string;
}

export interface CalendarDiaItem {
    nome_fantasia: string;
    cnpj: string;
    valor: number;
    data: string;
    tipo: 'PAGAR' | 'RECEBER';
}

// Generate some mock data
const generateMockData = (): Lancamento[] => {
    const items: Lancamento[] = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed

    // Helper to standard date key
    const fmt = (d: Date) => d.toISOString().split('T')[0];

    for (let i = 0; i < 50; i++) {
        const isPagar = Math.random() > 0.4;
        const day = Math.floor(Math.random() * 28) + 1;
        // Spread across current, prev, next month
        const mOffset = Math.floor(Math.random() * 3) - 1;
        const date = new Date(year, month + mOffset, day);

        items.push({
            uuid: uuidv4(),
            descricao: isPagar ? `Conta de Luz ${i}` : `Serviço ${i}`,
            valor: Math.floor(Math.random() * 1000) + 100,
            data_vencimento: fmt(date),
            data_pagamento: Math.random() > 0.8 ? fmt(date) : null,
            clf_tipo: { nome: isPagar ? 'A Pagar' : 'A Receber' },
            clf_status: { nome: 'Pendente' },
            dt_criacao: new Date().toISOString(),
            dt_alteracao: new Date().toISOString(),
            nome_fantasia: isPagar ? 'Enel' : 'Cliente XYZ',
            cnpj: '00.000.000/0001-00'
        });
    }
    return items;
};

// Singleton data
let mockStorage: Lancamento[] = generateMockData();

// Simulate API calls
export const fetchLancamentos = async (year: number, month: number): Promise<Lancamento[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Filter by month (simple string check)
            const targetMonth = String(month + 1).padStart(2, '0');
            const target = `${year}-${targetMonth}`;
            const filtered = mockStorage.filter(item => item.data_vencimento.startsWith(target));
            resolve(filtered.sort((a, b) => a.data_vencimento.localeCompare(b.data_vencimento)));
        }, 500);
    });
};

export const fetchDiaDetalhes = async (date: string): Promise<CalendarDiaItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const items = mockStorage.filter(item => item.data_vencimento === date);
            const mapped: CalendarDiaItem[] = items.map(i => ({
                nome_fantasia: i.nome_fantasia || i.descricao,
                cnpj: i.cnpj || '',
                valor: i.valor,
                data: i.data_vencimento,
                tipo: i.clf_tipo.nome === 'A Pagar' ? 'PAGAR' : 'RECEBER'
            }));
            resolve(mapped);
        }, 300);
    });
};

export const fetchResumo = async (year: number, month: number) => {
    // Assuming we just need raw items to calc locally or similar structure to mobile
    // Mobile returns `dias` array with aggregated values.
    const items = await fetchLancamentos(year, month);
    const diasMap: Record<string, { data: string, valor_pagar: number, valor_receber: number }> = {};

    items.forEach(item => {
        if (!diasMap[item.data_vencimento]) {
            diasMap[item.data_vencimento] = { data: item.data_vencimento, valor_pagar: 0, valor_receber: 0 };
        }
        if (item.clf_tipo.nome === 'A Pagar') {
            diasMap[item.data_vencimento].valor_pagar += item.valor;
        } else {
            diasMap[item.data_vencimento].valor_receber += item.valor;
        }
    });

    return { dias: Object.values(diasMap) };
};

export const addEvent = async (event: any) => {
    // Placeholder to keep compat if needed
    console.log("Adding event", event);
};

