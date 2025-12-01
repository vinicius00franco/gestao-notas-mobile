// Default KanbanBoard points to Drax implementation (recommended for production)
export { default as KanbanBoard } from './KanbanBoardDrax';
// Keep manual implementation available for reference under a different name
export { default as KanbanBoardManual } from './KanbanBoard';
export { default as KanbanCard } from './KanbanCard';
export { default as KanbanColumn } from './KanbanColumn';

// Nova implementação usando react-native-drax (recomendada)
export { default as KanbanBoardDrax } from './KanbanBoardDrax';
export { default as KanbanCardDrax } from './KanbanCardDrax';
export { default as KanbanColumnDrax } from './KanbanColumnDrax';