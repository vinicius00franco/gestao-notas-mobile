# Apresentação do App "Gestão de Notas"

Este documento apresenta as principais telas do aplicativo, seus objetivos e funcionalidades. Inclui referências às imagens em `docs/imgs-app` e fluxogramas de processos para entendimento dos fluxos.

Observação: As imagens devem ser colocadas em `docs/imgs-app`. Os nomes sugeridos abaixo podem ser ajustados conforme os arquivos disponíveis.

## Sumário
- Tela Home / Dashboard
- Notas Fiscais (Listagem e Detalhes)
- Classificar Notas (Kanban por Cliente)
- Calendário de Lançamentos
- Upload de Nota Fiscal (Processamento)

---

## Home / Dashboard
- Objetivo: visão geral da gestão de notas (alertas, recentes, navegação rápida).
- Principais elementos:
  - Filtros de período e status.
  - Cards de Alertas Fiscais (ex.: NF-e vencida, divergência).
  - Lista de Notas Recentes com valor e status.
  - Barra inferior de navegação.

Imagem: `../imgs-app/dashboard-1.png`

### Fluxo resumido
- Usuário acessa o Dashboard → ajusta filtros → navega para telas de Pagar, Receber, Upload ou Notas Recentes.

---

## Notas Fiscais
- Objetivo: listar notas com ações rápidas de "Ver" e "Excluir".
- Principais elementos:
  - Lista com número da NF, valor, nome e CNPJ do emitente.
  - Botões de ação por item: Ver, Excluir.

Imagens:
- Lista: `../imgs-app/notas-fiscais-lista-1.png`
- Topo da lista: `../imgs-app/notas-fiscais-lista-2.png`

### Detalhes da Nota
- Objetivo: visualizar atributos da NF (UUID, número, valor, CNPJ emitente, nome emitente) e ação de excluir.

Imagem: `../imgs-app/notas-fiscais-detalhe-1.png`

### Fluxo resumido
- Abrir Notas Fiscais → selecionar NF → Ver detalhes → (opcional) Excluir.

---

## Classificar Notas (Kanban)
- Objetivo: organizar notas por colunas (ex.: Não Classificado, Cliente) e movimentar cartões.
- Principais elementos:
  - Colunas com contadores.
  - Cartões com cliente, NF e CNPJ.
  - Arrastar e soltar (drag-and-drop) entre colunas.
  - Mensagens de erro de layout quando referências não estão disponíveis (ex.: `ref.measureLayout`).

Imagens:
- Colunas Cliente: `../imgs-app/classificar-notas-kanban-1.png`
- Coluna Não Classificado: `../imgs-app/classificar-notas-kanban-2.png`

### Fluxo resumido
- Abrir Classificação → revisar colunas → arrastar cartões para a coluna desejada → salvar ou prosseguir.

---

## Calendário de Lançamentos
- Objetivo: visualizar lançamentos (entradas/saídas) por dia e lista do mês.
- Principais elementos:
  - Calendário mensal com totais por dia (verde: entrada; vermelho: saída).
  - Lista de lançamentos do mês com descrição, data e valor.

Imagens:
- Calendário: `../imgs-app/calendario-1.png`
- Lista do mês: `../imgs-app/calendario-2.png`

### Fluxo resumido
- Navegar pelo mês → tocar em dias com lançamentos → revisar lista do mês.

---

## Upload de Nota Fiscal
- Objetivo: escolher arquivo de NF-e e processar, podendo informar CNPJ opcional da empresa.
- Principais elementos:
  - Botão "Escolher arquivo".
  - Campo CNPJ (opcional).
  - Botão "Processar Nota".

Imagem: `../imgs-app/upload-1.png`

### Fluxo resumido
- Abrir Upload → selecionar arquivo → informar CNPJ (opcional) → Processar Nota → acompanhar status.

---

## Navegação
- Menu hambúrguer e barra inferior para acesso rápido às seções: Dashboard, Pagar, Receber, Upload.
- Navegação de pilha para detalhes (ex.: Detalhes da Nota).

Imagem: `../imgs-app/navegacao-1.png`

---

Para fluxogramas e diagramas de casos de uso, consulte `fluxogramas.md` e `casos-uso.md` neste mesmo diretório.
