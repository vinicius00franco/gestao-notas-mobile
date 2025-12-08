import React, { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import {
    fetchResumo,
    fetchLancamentos,
    fetchDiaDetalhes,
    CalendarDiaItem,
    Lancamento
} from '../api/calendar';
import { LancamentoCalendarItem } from '../components/lancamento/LancamentoCalendarItem';
import { LancamentoMesItem } from '../components/lancamento/LancamentoMesItem';

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: ${({ theme }) => theme.colors.background};
`;

const CalendarWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.m}px;
  /* Override react-calendar styles to match theme */
  .react-calendar {
    width: 100%;
    background: transparent;
    border: none;
    font-family: inherit;
    line-height: 1.125em;
  }
  .react-calendar__navigation button {
    color: ${({ theme }) => theme.colors.primary};
    min-width: 44px;
    background: none;
    font-size: 16px;
    font-weight: bold;
  }
  .react-calendar__month-view__weekdays {
    text-transform: uppercase;
    font-size: 0.6em; /* Smaller weekday labels */
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none; /* Remove any underline */
    
    abbr {
      text-decoration: none;
      cursor: default;
    }
  }
  .react-calendar__tile {
    padding: 2px 0; /* Minimized padding to fit content */
    background: none;
    text-align: center;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};
    overflow: visible;
    height: 60px; /* Fixed height to accommodate date and balance */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &:enabled:hover,
    &:enabled:focus {
      background-color: ${({ theme }) => theme.colors.surfaceVariant};
      border-radius: 8px;
    }

    &.react-calendar__tile--now {
      background: transparent;
      abbr {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: bold;
        background: ${({ theme }) => theme.colors.surfaceVariant};
        border-radius: 50%;
        display: block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-bottom: 2px;
      }
    }
    
    &.react-calendar__tile--active {
      background: ${({ theme }) => theme.colors.primary} !important;
      color: ${({ theme }) => theme.colors.onPrimary} !important;
      border-radius: 8px;
      
      abbr {
        color: white !important;
      }
      
      .balance-text {
        color: white !important;
      }
    }
  }
`;

const BalanceText = styled.div<{ color: string }>`
  font-size: 8px; /* Slightly smaller to fit */
  font-weight: 700;
  color: ${({ color }) => color};
  white-space: nowrap;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-top: 4px;
`;

const DetailSheet = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: ${({ theme }) => theme.spacing.m}px;
  /* Add extra padding at bottom to ensure content clears navigation safely */
  padding-bottom: 80px; 
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
`;

/* ... existing styles ... */

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const DetailTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ theme, active }) => active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, active }) => active ? theme.colors.onPrimary : theme.colors.textSecondary};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.m}px;
  margin-bottom: 12px;
`;

export const CalendarScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [viewDate, setViewDate] = useState(new Date());

    // Search and filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'ALL' | 'PAGAR' | 'RECEBER'>('ALL');

    // Data state
    const [resumoData, setResumoData] = useState<{ dias: any[] } | null>(null);
    const [mesItems, setMesItems] = useState<Lancamento[]>([]);
    const [diaItems, setDiaItems] = useState<CalendarDiaItem[]>([]);
    const [loadingDia, setLoadingDia] = useState(false);

    // Load monthly summary and list
    useEffect(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        fetchResumo(year, month).then(setResumoData);
        fetchLancamentos(year, month).then(setMesItems);
    }, [viewDate]);

    // Load day details
    useEffect(() => {
        if (selectedDate) {
            setLoadingDia(true);
            fetchDiaDetalhes(selectedDate).then(items => {
                setDiaItems(items);
                setLoadingDia(false);
            });
        }
    }, [selectedDate]);

    // Filter mes items locally
    const filteredMesItems = useMemo(() => {
        return mesItems.filter(item => {
            const matchesSearch = item.descricao.toLowerCase().includes(searchTerm.toLowerCase());
            const typeKey = item.clf_tipo.nome === 'A Pagar' ? 'PAGAR' : 'RECEBER';
            const matchesType = filterType === 'ALL' || typeKey === filterType;
            return matchesSearch && matchesType;
        });
    }, [mesItems, searchTerm, filterType]);

    // Derived map for calendar tiles
    const saldoPorDia = useMemo(() => {
        const map: Record<string, number> = {};
        resumoData?.dias.forEach((d) => {
            const saldo = (d.valor_receber ?? 0) - (d.valor_pagar ?? 0);
            map[d.data] = saldo;
        });
        return map;
    }, [resumoData]);

    const onDateChange = (value: any) => {
        if (value instanceof Date) {
            const iso = value.toISOString().split('T')[0];
            setSelectedDate(iso);
        }
    };

    const onViewChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
        if (activeStartDate) {
            setViewDate(activeStartDate);
            setSelectedDate(null); // Clear selection on month change
        }
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const iso = date.toISOString().split('T')[0];
            const saldo = saldoPorDia[iso];

            if (saldo !== undefined) {
                const color = saldo >= 0 ? '#4CAF50' : '#F44336'; // Hardcoded for now, ideally theme.colors.success/error
                return (
                    <BalanceText className="balance-text" color={color}>
                        {formatCurrency(saldo)}
                    </BalanceText>
                );
            }
        }
        return null;
    };

    return (
        <ScreenContainer>
            <CalendarWrapper>
                <Calendar
                    onChange={onDateChange}
                    onActiveStartDateChange={onViewChange as any}
                    value={selectedDate ? new Date(selectedDate + 'T12:00:00') : viewDate}
                    tileContent={tileContent}
                    locale="pt-BR"
                    minDetail="month"
                />
            </CalendarWrapper>

            {!selectedDate && (
                <SearchWrapper>
                    <FilterContainer style={{ flexDirection: 'column', gap: 12 }}>
                        <SearchInput
                            style={{ width: '100%' }}
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: 8 }}>
                            <FilterButton style={{ flex: 1 }} active={filterType === 'PAGAR'} onClick={() => setFilterType(filterType === 'PAGAR' ? 'ALL' : 'PAGAR')}>Pagar</FilterButton>
                            <FilterButton style={{ flex: 1 }} active={filterType === 'RECEBER'} onClick={() => setFilterType(filterType === 'RECEBER' ? 'ALL' : 'RECEBER')}>Receber</FilterButton>
                        </div>
                    </FilterContainer>
                </SearchWrapper>
            )}

            <DetailSheet>
                {selectedDate ? (
                    <>
                        <DetailHeader>
                            <DetailTitle>Detalhes de {selectedDate.split('-').reverse().slice(0, 2).join('/')}</DetailTitle>
                            <ActionButton onClick={() => setSelectedDate(null)}>Visão do Mês</ActionButton>
                        </DetailHeader>
                        {loadingDia ? (
                            <div style={{ padding: 20, textAlign: 'center' }}>Carregando...</div>
                        ) : (
                            diaItems.map((item, idx) => (
                                <LancamentoCalendarItem key={idx} item={item} />
                            ))
                        )}
                        {!loadingDia && diaItems.length === 0 && (
                            <div style={{ padding: 20, textAlign: 'center', color: '#888' }}>Nenhum lançamento</div>
                        )}
                    </>
                ) : (
                    <>
                        <DetailHeader>
                            <DetailTitle>Lançamentos do Mês</DetailTitle>
                        </DetailHeader>

                        {filteredMesItems.map(item => (
                            <LancamentoMesItem key={item.uuid} item={item} />
                        ))}
                        {filteredMesItems.length === 0 && (
                            <div style={{ padding: 20, textAlign: 'center', color: '#888' }}>Nenhum lançamento encontrado</div>
                        )}
                    </>
                )}
            </DetailSheet>
        </ScreenContainer>
    );
};


export default CalendarScreen;


