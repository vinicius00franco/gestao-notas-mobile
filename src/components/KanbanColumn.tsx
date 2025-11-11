import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import NotaFiscalCard from './NotaFiscalCard';

interface NotaFiscal {
  uuid: string;
  numero: string;
  valor_total: number | string;
  nome_emitente: string;
  cnpj_emitente: string;
  classificacao_id: string;
  parceiro: {
    uuid: string;
    nome: string;
    cnpj: string;
  };
  id?: string;
  valor?: number | string;
}

interface KanbanColumnProps {
  column: {
    id: string;
    nome: string;
    notas: NotaFiscal[];
  };
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  const renderItem = ({ item }: { item: any }) => (
    <NotaFiscalCard item={item} />
  );

  return (
    <View style={styles.column}>
      <Text style={styles.columnHeader}>
        {column.nome}
      </Text>
      <FlatList
        data={column.notas}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    marginVertical: 10,
    paddingVertical: 10,
  },
  columnHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
    color: '#000000',
  },
});

export default KanbanColumn;