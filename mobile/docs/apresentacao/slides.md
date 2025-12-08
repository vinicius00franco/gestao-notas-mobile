# Roteiro de Slides — Gestão de Notas (Mobile)

Este roteiro organiza a apresentação em três blocos: Casos de Uso, Fluxogramas e Telas do App. Cada slide referencia explicitamente os arquivos dos diagramas (`.puml`/Mermaid) e as imagens em `docs/imgs-app`.

---

## Slide 1 — Título e Contexto
- Título: Gestão de Notas (Mobile)
- Objetivo: visão geral do app para controle de NF-e, classificação, calendário e upload.

---

## Slide 2 — Diagrama de Casos de Uso
- Mostrar o diagrama geral com os atores e casos.
- Arquivos de referência:
  - PlantUML: `docs/apresentacao/casos-uso.puml`
  - Mermaid: `docs/apresentacao/casos-uso.md`
- Imagem (exportada): `docs/imgs-app/casos-uso.png`

Exibir imagem no slide:

![Casos de Uso](../imgs-app/casos-uso.png)

Notas do apresentador
- Destaque: Usuário interage com Dashboard, Notas, Classificação, Calendário e Upload.
- Integração: sistema de notificações para alertas e deep-link para detalhes.

---

## Slide 3 — Fluxo: Dashboard
- Arquivos de referência:
  - PlantUML: `docs/apresentacao/fluxograma-dashboard.puml`
  - Mermaid equivalente: seção "Dashboard" em `docs/apresentacao/fluxogramas.md`
- Imagem (exportada): `docs/imgs-app/fluxo-dashboard.png`

![Fluxo Dashboard](../imgs-app/fluxo-dashboard.png)

Mensagem-chave
- Filtros → acesso rápido a Notas Recentes, Pagar, Receber e Upload.

---

## Slide 4 — Fluxo: Notas Fiscais (Lista → Detalhes → Excluir)
- Arquivos de referência:
  - PlantUML: `docs/apresentacao/fluxograma-notas.puml`
  - Mermaid equivalente: seção "Notas Fiscais" em `docs/apresentacao/fluxogramas.md`
- Imagem (exportada): `docs/imgs-app/fluxo-notas.png`

![Fluxo Notas](../imgs-app/fluxo-notas.png)

Mensagem-chave
- Ação por item: Ver detalhes ou Excluir com confirmação.

---

## Slide 5 — Fluxo: Classificar Notas (Kanban)
- Arquivos de referência:
  - PlantUML: `docs/apresentacao/fluxograma-classificar.puml`
  - Mermaid equivalente: seção "Classificar Notas (Kanban)" em `docs/apresentacao/fluxogramas.md`
- Imagem (exportada): `docs/imgs-app/fluxo-classificar.png`

![Fluxo Classificar](../imgs-app/fluxo-classificar.png)

Mensagem-chave
- Arrastar cartões entre colunas; tratar avisos de layout quando necessário.

---

## Slide 6 — Fluxo: Calendário de Lançamentos
- Arquivos de referência:
  - PlantUML: `docs/apresentacao/fluxograma-calendario.puml`
  - Mermaid equivalente: seção "Calendário de Lançamentos" em `docs/apresentacao/fluxogramas.md`
- Imagem (exportada): `docs/imgs-app/fluxo-calendario.png`

![Fluxo Calendário](../imgs-app/fluxo-calendario.png)

Mensagem-chave
- Visão mensal com totais por dia e lista agregada do mês.

---

## Slide 7 — Fluxo: Upload de Nota Fiscal
- Arquivos de referência:
  - PlantUML: `docs/apresentacao/fluxograma-upload.puml`
  - Mermaid equivalente: seção "Upload de Nota Fiscal" em `docs/apresentacao/fluxogramas.md`
- Imagem (exportada): `docs/imgs-app/fluxo-upload.png`

![Fluxo Upload](../imgs-app/fluxo-upload.png)

Mensagem-chave
- Selecionar arquivo, CNPJ opcional e processamento com feedback de sucesso/erro.

---

## Slide 8 — Telas: Dashboard
- Imagem: `docs/imgs-app/dashboard-1.png`

![Dashboard](../imgs-app/dashboard-1.png)

Notas do apresentador
- Alertas fiscais, notas recentes, navegação inferior.

---

## Slide 9 — Telas: Notas Fiscais (Lista)
- Imagem: `docs/imgs-app/notas-fiscais-lista-1.png`

![Notas Fiscais – Lista](../imgs-app/notas-fiscais-lista-1.png)

Notas do apresentador
- Ações por item: Ver / Excluir; exibição de CNPJ e valor.

---

## Slide 10 — Telas: Detalhes da Nota
- Imagem: `docs/imgs-app/notas-fiscais-detalhe-1.png`

![Detalhes da Nota](../imgs-app/notas-fiscais-detalhe-1.png)

Notas do apresentador
- Mostrar UUID, número, valor total, CNPJ e botão de exclusão.

---

## Slide 11 — Telas: Classificar Notas (Kanban)
- Imagens:
  - `docs/imgs-app/classificar-notas-kanban-1.png`
  - `docs/imgs-app/classificar-notas-kanban-2.png`

![Classificar Notas 1](../imgs-app/classificar-notas-kanban-1.png)

![Classificar Notas 2](../imgs-app/classificar-notas-kanban-2.png)

Notas do apresentador
- Colunas com contadores; cartões com cliente, NF e CNPJ.

---

## Slide 12 — Telas: Calendário de Lançamentos
- Imagem: `docs/imgs-app/calendario-1.png`

![Calendário](../imgs-app/calendario-1.png)

Notas do apresentador
- Entradas verdes, saídas vermelhas; lista do mês abaixo do calendário.

---

## Slide 13 — Telas: Upload de Nota
- Imagem: `docs/imgs-app/upload-1.png`

![Upload](../imgs-app/upload-1.png)

Notas do apresentador
- Botão para escolher arquivo, campo CNPJ opcional e ação Processar.

---

## Slide 14 — Encerramento e Próximos Passos
- Métricas futuras: taxa de sucesso no upload, tempo de classificação, cobertura de testes.
- Links úteis:
  - `docs/apresentacao/README.md` (visão geral)
  - `docs/apresentacao/casos-uso.md` (Mermaid)
  - `docs/apresentacao/fluxogramas.md` (Mermaid)
  - `docs/apresentacao/casos-uso.puml` e `docs/apresentacao/fluxograma-*.puml` (PlantUML)

---

## Slide 15 — Conclusão do Projeto e Próximos Passos Técnicos

- Conclusão (resumo): o app oferece visualização de alertas fiscais, gerenciamento de notas, classificação por kanban, calendário de lançamentos e upload/extração de NF-e.
- Objetivos para próximo ciclo:
  - Disponibilizar integração de notificações push para alertas críticos (vencimentos, divergências) com deep-links para detalhes.
  - Implementar geração assistida de notas fiscais com apoio de IA especializada em contabilidade (validações fiscais e regras contábeis).

### Integração de Notificações — passos práticos
- Escolher provedor: ex.: OneSignal, Firebase Cloud Messaging, ou provedores regionais com suporte a conformidade.
- Eventos a publicar: NF vencida, Divergência, Upload processado (sucesso/falha), Nova classificação.
- Arquitetura: publicar eventos no backend → fila (RabbitMQ/Kafka) → serviço de notificações → provider/Push. Incluir webhooks para ações no app.
- Deep-linking: incluir payload com rota e ID da nota para abrir diretamente a tela de detalhe.
- Resiliência: retries, fallback (SMS/email) e monitoramento (SLO/alerts).

### Geração de Nota Fiscal com IA (especialidade contábil)
- Caso de uso: criar rascunho de NF-e ou preencher campos a partir de documentos/entrada de dados.
- Abordagem técnica:
  - Pipeline: OCR (se partir de PDF/imagem) → extração de entidades → normalização (CNPJ, CFOP, NCM) → validação contábil/fiscal usando regras codificadas e modelos ML.
  - Modelos: fine-tune de LLMs para preencher templates e justificar decisões contábeis; regras exatas para cálculos fiscais e impostos.
  - Integração: gerar XML/JSON de NF-e compatível com esquemas officiais e expor em endpoint/serviço para assinatura e envio eletrônico.
- Governança e compliance: histórico de alterações, trilha de auditoria, validação por especialista humano antes do envio.

### Cronograma sugerido (exemplo)
- 0–2 semanas: definir eventos e contrato de payloads; escolher provedor de notificações.
- 2–6 semanas: implementar backend de eventos + integração push + deep-links + testes end-to-end.
- 4–12 semanas: POC de geração de NF com IA (OCR + extração + template), validação por contábil.

### Métricas de sucesso
- Redução do tempo médio de classificação.
- Taxa de entrega de notificações (>= 95%).
- Precisão da extração/geração de NF (meta inicial > 85%, com revisão humana).

---

## Apêndice — Exportar diagramas (opcional)
- Gerar PNG a partir dos `.puml`:
```bash
plantuml -tpng docs/apresentacao/casos-uso.puml
plantuml -tpng docs/apresentacao/fluxograma-*.puml
```
- Mover/renomear arquivos exportados para `docs/imgs-app/` conforme os nomes referenciados acima.
