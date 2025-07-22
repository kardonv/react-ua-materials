import { TodoAction, TodoState } from "../types/TodoReducer";

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: state.nextId,
                        text: action.payload.text,
                        completed: false,
                        priority: action.payload.priority
                    }
                ],
                nextId: state.nextId + 1
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };

        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };

        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, text: action.payload.text }
                        : todo
                )
            };

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };

        case 'CLEAR_COMPLETED':
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            };

        case 'TOGGLE_ALL':
            const allCompleted = state.todos.every(todo => todo.completed);
            return {
                ...state,
                todos: state.todos.map(todo => ({
                    ...todo,
                    completed: !allCompleted
                }))
            };

        default:
            return state;
    }
}