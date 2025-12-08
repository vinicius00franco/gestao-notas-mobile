# Fluxogramas de Funcionalidades

Os fluxos abaixo descrevem, em alto nível, como o usuário interage com as principais funcionalidades do app. Diagramas em Mermaid podem ser visualizados nativamente em várias plataformas.

## Dashboard

```mermaid
%% Tema moderno e estilização
flowchart TD
    classDef primary fill:#e9f5e9,stroke:#6fa56f,stroke-width:2px,color:#1f3d1f,corner-radius:8px
    classDef decision fill:#fff3cd,stroke:#f0ad4e,stroke-width:2px,color:#614a00,corner-radius:8px
    classDef action fill:#e7f0ff,stroke:#5b8def,stroke-width:2px,color:#0a2a66,corner-radius:8px
    classDef end fill:#fde2e1,stroke:#d9534f,stroke-width:2px,color:#5a1e1c,corner-radius:8px

    A[Abrir App]:::primary --> B[Carregar Dashboard]:::primary
    B --> C[Aplicar Filtros]:::action
    C --> D{Escolher Seção}:::decision
    D -->|Notas Recentes| E[Ir para Detalhes de Nota]:::action
    D -->|Pagar| F[Abrir Tela de Contas a Pagar]:::action
    D -->|Receber| G[Abrir Tela de Contas a Receber]:::action
    D -->|Upload| H[Abrir Tela de Upload]:::action
    E --> I[Voltar ao Dashboard]:::primary
    F --> I
    G --> I
    H --> I
```

## Notas Fiscais: Listar e Ver Detalhes

```mermaid
flowchart TD
    classDef primary fill:#e9f5e9,stroke:#6fa56f,stroke-width:2px,color:#1f3d1f,corner-radius:8px
    classDef decision fill:#fff3cd,stroke:#f0ad4e,stroke-width:2px,color:#614a00,corner-radius:8px
    classDef danger fill:#fde2e1,stroke:#d9534f,stroke-width:2px,color:#5a1e1c,corner-radius:8px
    classDef action fill:#e7f0ff,stroke:#5b8def,stroke-width:2px,color:#0a2a66,corner-radius:8px

    A[Abrir Lista de Notas]:::primary --> B[Visualizar itens]:::primary
    B --> C{Ação por Item}:::decision
    C -->|Ver| D[Abrir Detalhes da Nota]:::action
    C -->|Excluir| E[Confirmar Exclusão]:::danger
    E -->|Confirmado| F[Remover Nota]:::danger
    E -->|Cancelar| B
    D --> G[Voltar à Lista]:::primary
```

## Classificar Notas (Kanban)

```mermaid
flowchart TD
    classDef primary fill:#e9f5e9,stroke:#6fa56f,stroke-width:2px,color:#1f3d1f,corner-radius:8px
    classDef decision fill:#fff3cd,stroke:#f0ad4e,stroke-width:2px,color:#614a00,corner-radius:8px
    classDef warn fill:#ffe8e6,stroke:#c9302c,stroke-width:2px,color:#5a1e1c,corner-radius:8px
    classDef action fill:#e7f0ff,stroke:#5b8def,stroke-width:2px,color:#0a2a66,corner-radius:8px

    A[Abrir Classificação]:::primary --> B[Carregar Colunas]:::primary
    B --> C[Arrastar Cartão entre Colunas]:::action
    C --> D{Validação de Layout}:::decision
    D -->|OK| E[Atualizar Estado]:::action
    D -->|Erro ref.measureLayout| F[Exibir Aviso]:::warn
    E --> G[Prosseguir / Salvar]:::primary
    F --> B
```

## Calendário de Lançamentos

```mermaid
flowchart TD
    classDef primary fill:#e9f5e9,stroke:#6fa56f,stroke-width:2px,color:#1f3d1f,corner-radius:8px
    classDef action fill:#e7f0ff,stroke:#5b8def,stroke-width:2px,color:#0a2a66,corner-radius:8px

    A[Abrir Calendário]:::primary --> B[Selecionar Mês]:::action
    B --> C[Visualizar Totais por Dia]:::primary
    C --> D[Ver Lista do Mês]:::action
    D --> E[Revisar Lançamentos]:::primary
    E --> F[Voltar / Navegar]:::primary
```

## Upload de Nota Fiscal

```mermaid
flowchart TD
    classDef primary fill:#e9f5e9,stroke:#6fa56f,stroke-width:2px,color:#1f3d1f,corner-radius:8px
    classDef decision fill:#fff3cd,stroke:#f0ad4e,stroke-width:2px,color:#614a00,corner-radius:8px
    classDef success fill:#e8f7e8,stroke:#28a745,stroke-width:2px,color:#1f3d1f,corner-radius:8px
    classDef danger fill:#fde2e1,stroke:#d9534f,stroke-width:2px,color:#5a1e1c,corner-radius:8px
    classDef action fill:#e7f0ff,stroke:#5b8def,stroke-width:2px,color:#0a2a66,corner-radius:8px

    A[Abrir Upload]:::primary --> B[Escolher Arquivo]:::action
    B --> C[Informar CNPJ opcional]:::action
    C --> D[Processar Nota]:::action
    D --> E{Resultado}:::decision
    E -->|Sucesso| F[Confirmar / Navegar]:::success
    E -->|Falha| G[Exibir Mensagem / Tentar novamente]:::danger
```
