export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
}

export interface TodoState {
    todos: Todo[];
    filter: 'all' | 'active' | 'completed';
    nextId: number;
}

export type TodoAction =
    | { type: 'ADD_TODO'; payload: { text: string; priority: 'low' | 'medium' | 'high' } }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'UPDATE_TODO'; payload: { id: number; text: string } }
    | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
    | { type: 'CLEAR_COMPLETED' }
    | { type: 'TOGGLE_ALL' };