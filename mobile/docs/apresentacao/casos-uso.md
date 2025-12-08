# Diagramas de Casos de Uso

Os diagramas abaixo descrevem os atores e seus casos de uso principais no aplicativo. Utiliza-se Mermaid para representação.

## Atores
- Usuário (Gestor Financeiro)
- Sistema de Notificações (externo)

## Casos de Uso do Usuário

```mermaid
%% Diagrama moderno de casos de uso com estilização
flowchart LR
    classDef actor fill:#f0f7ff,stroke:#5b8def,stroke-width:2px,color:#0a2a66,corner-radius:8px
    classDef usecase fill:#fff,stroke:#6fa56f,stroke-width:2px,color:#1f3d1f,corner-radius:16px

    actor[Usuário]:::actor

    subgraph Casos de Uso
        CU1((Visualizar Dashboard)):::usecase
        CU2((Listar Notas Fiscais)):::usecase
        CU3((Ver Detalhes da Nota)):::usecase
        CU4((Excluir Nota)):::usecase
        CU5((Classificar Notas - Kanban)):::usecase
        CU6((Visualizar Calendário)):::usecase
        CU7((Upload de Nota Fiscal)):::usecase
    end

    actor --> CU1
    actor --> CU2
    CU2 --> CU3
    CU3 --> CU4
    actor --> CU5
    actor --> CU6
    actor --> CU7
```

## Interações com Sistema de Notificações

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuário
    participant APP as App Gestão de Notas
    participant NOTIF as Sistema de Notificações

    rect rgb(242, 248, 242)
    U->>APP: Ajusta filtros/ações no Dashboard
    APP->>NOTIF: Agenda/Atualiza alertas (vencimentos, divergências)
    end
    rect rgb(255, 245, 238)
    NOTIF-->>U: Envia notificação push
    U->>APP: Abre detalhe via notificação
    end
    APP-->>U: Exibe detalhes/ações
```

## Escopo dos Casos
- Visualizar Dashboard: visão geral, filtros e navegação.
- Listar Notas Fiscais: página de index com ações por item.
- Ver Detalhes da Nota: atributos da NF e ação de exclusão.
- Excluir Nota: confirmação e remoção.
- Classificar Notas: movimentar cartões entre colunas.
- Visualizar Calendário: totais por dia e lançamentos do mês.
- Upload de Nota Fiscal: seleção de arquivo, CNPJ opcional e processamento.
