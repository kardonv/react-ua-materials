import React, { useReducer, useState } from 'react';

import styles from './styles.module.css';

// Define Todo item type
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

// Define the state type
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  nextId: number;
}

// Define action types
type TodoAction = 
  | { type: 'ADD_TODO'; payload: { text: string; priority: 'low' | 'medium' | 'high' } }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'UPDATE_TODO'; payload: { id: number; text: string } }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'TOGGLE_ALL' };

// Initial state
const initialState: TodoState = {
  todos: [],
  filter: 'all',
  nextId: 1
};

// Reducer function
function todoReducer(state: TodoState, action: TodoAction): TodoState {
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

export default function TodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  // Filter todos based on current filter
  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch({
        type: 'ADD_TODO',
        payload: { text: newTodoText.trim(), priority: newTodoPriority }
      });
      setNewTodoText('');
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() && editingId) {
      dispatch({
        type: 'UPDATE_TODO',
        payload: { id: editingId, text: editText.trim() }
      });
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const completedCount = state.todos.filter(todo => todo.completed).length;
  const totalCount = state.todos.length;

  return (
    <div className={styles.container}>
      <h2 className={styles.counterDisplayCentered}>Todo List with useReducer</h2>

      {/* Add Todo Form */}
      <div className={styles.todoForm}>
        <h4 className={styles.todoFormTitle}>Add New Todo:</h4>
        <div className={styles.todoFormGroup}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Enter todo text"
            className={styles.todoFormInput}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          
          <select
            value={newTodoPriority}
            onChange={(e) => setNewTodoPriority(e.target.value as 'low' | 'medium' | 'high')}
            className={styles.formSelect}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button
            onClick={handleAddTodo}
            className={`${styles.buttonSmall} ${styles.buttonPrimary}`}
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className={styles.todoFilters}>
        <div className={styles.todoFilterGroup}>
          <button
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
            className={`${styles.todoFilterButton} ${state.filter === 'all' ? styles.todoFilterButtonActive : ''}`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
            className={`${styles.todoFilterButton} ${state.filter === 'active' ? styles.todoFilterButtonActive : ''}`}
          >
            Active ({totalCount - completedCount})
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
            className={`${styles.todoFilterButton} ${state.filter === 'completed' ? styles.todoFilterButtonActive : ''}`}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div className={styles.todoActionGroup}>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_ALL' })}
            className={`${styles.buttonTiny} ${styles.buttonSuccess}`}
          >
            Toggle All
          </button>
          <button
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            className={`${styles.buttonTiny} ${styles.buttonDanger}`}
          >
            Clear Completed
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className={styles.todoList}>
        {filteredTodos.length === 0 ? (
          <div className={styles.todoEmpty}>
            {state.filter === 'all' ? 'No todos yet' : `No ${state.filter} todos`}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              className={`${styles.todoItem} ${todo.completed ? styles.todoItemCompleted : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                style={{ margin: 0 }}
              />
              
              <span
                className={`${styles.todoPriority} ${
                  todo.priority === 'high' ? styles.todoPriorityHigh :
                  todo.priority === 'medium' ? styles.todoPriorityMedium :
                  styles.todoPriorityLow
                }`}
              />
              
              {editingId === todo.id ? (
                <div className={styles.todoEditForm}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={styles.todoEditInput}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                  />
                  <button
                    onClick={handleSaveEdit}
                    className={`${styles.buttonMicro} ${styles.buttonSuccess}`}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className={`${styles.buttonMicro} ${styles.buttonSecondary}`}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <span
                  className={`${styles.todoItemText} ${todo.completed ? styles.todoItemTextCompleted : ''}`}
                >
                  {todo.text}
                </span>
              )}
              
              <span
                className={`${styles.todoPriorityLabel} ${
                  todo.priority === 'high' ? styles.todoPriorityLabelHigh :
                  todo.priority === 'medium' ? styles.todoPriorityLabelMedium :
                  styles.todoPriorityLabelLow
                }`}
              >
                {todo.priority}
              </span>
              
              <div className={styles.todoActions}>
                <button
                  onClick={() => handleEditTodo(todo)}
                  className={`${styles.buttonMicro} ${styles.buttonInfo}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                  className={`${styles.buttonMicro} ${styles.buttonDanger}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.explanationSection}>
        <h4>useReducer Benefits for Todo App:</h4>
        <ul className={styles.explanationList}>
          <li><strong>Centralized State Logic:</strong> All todo operations in one reducer</li>
          <li><strong>Predictable Updates:</strong> Each action has a clear, predictable effect</li>
          <li><strong>Easy Testing:</strong> Reducer is a pure function, easy to test</li>
          <li><strong>Complex State Management:</strong> Handles multiple related state updates</li>
          <li><strong>Debugging:</strong> Easy to track state changes through actions</li>
        </ul>
      </div>
    </div>
  );
} 