import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useClassificacoes, useCreateClassificacao } from '../../hooks/api';
import { Classificacao } from '../../types';

interface ClassificacaoManagerProps {
  visible: boolean;
  onClose: () => void;
  onSelectClassificacao?: (classificacao: Classificacao) => void;
  selectedClassificacaoId?: string;
}

export default function ClassificacaoManager({
  visible,
  onClose,
  onSelectClassificacao,
  selectedClassificacaoId,
}: ClassificacaoManagerProps) {
  const { colors, typography } = useTheme();
  const { data: classificacoes = [], isLoading } = useClassificacoes();
  const createClassificacao = useCreateClassificacao();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNome, setNewNome] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('label');

  const iconOptions = [
    'label', 'business', 'person', 'shopping-cart', 'build', 'local-shipping',
    'restaurant', 'local-grocery-store', 'cleaning-services', 'engineering',
    'medical-services', 'school', 'sports', 'music-note', 'palette', 'code'
  ];

  const handleCreateClassificacao = async () => {
    if (!newNome.trim()) {
      Alert.alert('Erro', 'Nome da classificação é obrigatório');
      return;
    }

    try {
      await createClassificacao.mutateAsync({
        nome: newNome.trim(),
        icone: selectedIcon,
      });
      setNewNome('');
      setSelectedIcon('label');
      setShowCreateForm(false);
      Alert.alert('Sucesso', 'Classificação criada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar classificação');
    }
  };

  const renderClassificacaoItem = ({ item }: { item: Classificacao }) => (
    <TouchableOpacity
      style={[
        styles.classificacaoItem,
        {
          backgroundColor: selectedClassificacaoId === item.id ? colors.primaryContainer : colors.surface,
          borderColor: selectedClassificacaoId === item.id ? colors.primary : colors.border,
        },
      ]}
      onPress={() => {
        onSelectClassificacao?.(item);
        onClose();
      }}
    >
      <View style={styles.classificacaoContent}>
        <MaterialIcons
          name={(item.icone as any) || 'label'}
          size={24}
          color={selectedClassificacaoId === item.id ? colors.primary : colors.onSurface}
        />
        <Text
          style={[
            styles.classificacaoNome,
            {
              color: selectedClassificacaoId === item.id ? colors.primary : colors.onSurface,
              fontWeight: item.isCustom ? 'bold' : 'normal',
            },
          ]}
        >
          {item.nome}
          {item.isCustom && ' (Customizada)'}
        </Text>
      </View>
      {item.id === 'nao-classificado' && (
        <Text style={[styles.classificacaoBadge, { color: colors.secondary }]}>
          Padrão
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderIconOption = (iconName: string) => (
    <TouchableOpacity
      key={iconName}
      style={[
        styles.iconOption,
        {
          backgroundColor: selectedIcon === iconName ? colors.primaryContainer : colors.surface,
          borderColor: selectedIcon === iconName ? colors.primary : colors.border,
        },
      ]}
      onPress={() => setSelectedIcon(iconName)}
    >
      <MaterialIcons
        name={iconName as any}
        size={24}
        color={selectedIcon === iconName ? colors.primary : colors.onSurface}
      />
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[typography.h2, { color: colors.onSurface }]}>Classificações</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color={colors.onSurface} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={classificacoes}
          keyExtractor={(item) => item.id}
          renderItem={renderClassificacaoItem}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <TouchableOpacity
              style={[styles.createButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowCreateForm(true)}
            >
              <MaterialIcons name="add" size={24} color={colors.onPrimary} />
              <Text style={[styles.createButtonText, { color: colors.onPrimary }]}>
                Criar Classificação Customizada
              </Text>
            </TouchableOpacity>
          }
        />

        {/* Modal para criar nova classificação */}
        <Modal visible={showCreateForm} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <Text style={[typography.h2, { color: colors.onSurface, marginBottom: 16 }]}>
                Nova Classificação
              </Text>

              <TextInput
                style={[styles.input, { borderColor: colors.border, color: colors.onSurface }]}
                placeholder="Nome da classificação"
                placeholderTextColor={colors.onSurfaceVariant}
                value={newNome}
                onChangeText={setNewNome}
              />

              <Text style={[styles.label, { color: colors.onSurface, marginTop: 16 }]}>
                Ícone:
              </Text>
              <View style={styles.iconGrid}>
                {iconOptions.map(renderIconOption)}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.surfaceVariant }]}
                  onPress={() => setShowCreateForm(false)}
                >
                  <Text style={{ color: colors.onSurface }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.primary }]}
                  onPress={handleCreateClassificacao}
                  disabled={createClassificacao.isPending}
                >
                  <Text style={{ color: colors.onPrimary }}>
                    {createClassificacao.isPending ? 'Criando...' : 'Criar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  listContainer: {
    padding: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  createButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  classificacaoItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  classificacaoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classificacaoNome: {
    marginLeft: 12,
    fontSize: 16,
  },
  classificacaoBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
});