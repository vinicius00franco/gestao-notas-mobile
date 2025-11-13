import Loading from '@/components/ui/Loading';
import { JobStatus, PaginatedResponse } from '@/types';
import { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDeleteJob, useListJobsConcluidos, useListJobsErros, useListJobsPendentes, useReprocessJob } from '../hooks/api';
import TabBar from '@/components/ui/TabBar';
import JobItemComponent from '@/components/job/JobItemComponent';

export default function JobStatusScreen() {
  const [activeTab, setActiveTab] = useState<number>(0); // 0: PENDENTE, 1: CONCLUIDO, 2: ERRO
  const anim = useSharedValue(0);
  const animatingRef = useRef(false);

  const pendentes = useListJobsPendentes();
  const concluidos = useListJobsConcluidos();
  const erros = useListJobsErros();

  const reprocessJob = useReprocessJob();
  const deleteJob = useDeleteJob();

  const flipTo = (newIndex: number) => {
    if (newIndex === activeTab || animatingRef.current) return;
    animatingRef.current = true;

    const resetAnimating = () => {
      animatingRef.current = false;
    };

    const updateTab = () => {
      setActiveTab(newIndex);
    };

    // Primeiro meio-flip
    anim.value = withTiming(90, { duration: 200 }, (finished) => {
      if (!finished) {
        runOnJS(resetAnimating)();
        return;
      }
      // Trocar conteúdo na thread JS
      runOnJS(updateTab)();
      // Continuar a animação do outro lado
      anim.value = -90;
      anim.value = withTiming(0, { duration: 200 }, (finished) => {
        runOnJS(resetAnimating)();
      });
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${anim.value}deg` }],
      backfaceVisibility: 'hidden',
    } as any;
  });

  const tabs = [
    { key: 'PENDENTE', label: 'Pendentes', count: 0 },
    { key: 'CONCLUIDO', label: 'Concluídas', count: 0 },
    { key: 'ERRO', label: 'Erros', count: 0 },
  ];

  const pendentesTotal =
    pendentes.data?.pages.reduce(
      (acc: number, page: PaginatedResponse<JobStatus>) => acc + (page.results?.length ?? 0),
      0,
    ) ?? 0;
  const concluidosTotal =
    concluidos.data?.pages.reduce(
      (acc: number, page: PaginatedResponse<JobStatus>) => acc + (page.results?.length ?? 0),
      0,
    ) ?? 0;
  const errosTotal =
    erros.data?.pages.reduce(
      (acc: number, page: PaginatedResponse<JobStatus>) => acc + (page.results?.length ?? 0),
      0,
    ) ?? 0;

  tabs[0].count = pendentesTotal;
  tabs[1].count = concluidosTotal;
  tabs[2].count = errosTotal;

  const currentQuery = activeTab === 0 ? pendentes : activeTab === 1 ? concluidos : erros;
  const currentList = currentQuery.data?.pages.flatMap((page: PaginatedResponse<JobStatus>) => page.results) || [];

  const handleReprocess = (uuid: string) => {
    reprocessJob.mutate(uuid, {
      onSuccess: () => showMessage({ message: 'Job reenfileirado!', type: 'success' }),
      onError: (e: any) => showMessage({ message: e.message || 'Erro', type: 'danger' }),
    });
  };

  const handleDelete = (uuid: string) => {
    deleteJob.mutate(uuid, {
      onSuccess: () => showMessage({ message: 'Job excluído!', type: 'success' }),
      onError: (e: any) => showMessage({ message: e.message || 'Erro', type: 'danger' }),
    });
  };

  if (currentQuery.isLoading && !currentQuery.isFetchingNextPage) return <Loading />;
  if (currentQuery.isError) return <Text style={{ padding: 16 }}>Erro ao buscar notas processadas.</Text>;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Notas processadas</Text>
      </View>

      <TabBar tabs={tabs} activeIndex={activeTab} onTabPress={flipTo} />

      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <FlatList
          data={currentList}
          keyExtractor={(item: JobStatus) => item.uuid}
          renderItem={({ item }: { item: JobStatus }) => (
            <JobItemComponent
              item={item}
              onReprocess={handleReprocess}
              onDelete={handleDelete}
              isReprocessing={reprocessJob.isPending}
              isDeleting={deleteJob.isPending}
            />
          )}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          refreshing={currentQuery.isLoading}
          onRefresh={currentQuery.refetch}
          onEndReached={() => {
            if (currentQuery.hasNextPage && !currentQuery.isFetchingNextPage) {
              currentQuery.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            if (currentQuery.isFetchingNextPage) {
              return (
                <View style={{ padding: 20 }}>
                  <ActivityIndicator size="small" />
                </View>
              );
            }
            return null;
          }}
          ListEmptyComponent={() => (
            <View style={{ padding: 24, alignItems: 'center' }}>
              <Text>Nenhuma nota nesta categoria.</Text>
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  animatedContainer: {
    flex: 1,
    backfaceVisibility: 'hidden',
  },
});