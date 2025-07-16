import React, { useReducer, useEffect } from 'react';

import styles from './styles.module.css';

// Define data types
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define the state type
interface AsyncState {
  users: {
    data: User[];
    loading: boolean;
    error: string;
  };
  posts: {
    data: Post[];
    loading: boolean;
    error: string;
  };
  selectedUser: User | null;
  selectedPost: Post | null;
}

// Define action types
type AsyncAction = 
  | { type: 'FETCH_USERS_START' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
  | { type: 'FETCH_USERS_ERROR'; payload: string }
  | { type: 'FETCH_POSTS_START' }
  | { type: 'FETCH_POSTS_SUCCESS'; payload: Post[] }
  | { type: 'FETCH_POSTS_ERROR'; payload: string }
  | { type: 'SELECT_USER'; payload: User }
  | { type: 'SELECT_POST'; payload: Post }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'RESET_STATE' };

// Initial state
const initialState: AsyncState = {
  users: {
    data: [],
    loading: false,
    error: ''
  },
  posts: {
    data: [],
    loading: false,
    error: ''
  },
  selectedUser: null,
  selectedPost: null
};

// Reducer function
function asyncReducer(state: AsyncState, action: AsyncAction): AsyncState {
  switch (action.type) {
    case 'FETCH_USERS_START':
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          error: ''
        }
      };

    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: {
          data: action.payload,
          loading: false,
          error: ''
        }
      };

    case 'FETCH_USERS_ERROR':
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: action.payload
        }
      };

    case 'FETCH_POSTS_START':
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
          error: ''
        }
      };

    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        posts: {
          data: action.payload,
          loading: false,
          error: ''
        }
      };

    case 'FETCH_POSTS_ERROR':
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false,
          error: action.payload
        }
      };

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload,
        selectedPost: null
      };

    case 'SELECT_POST':
      return {
        ...state,
        selectedPost: action.payload
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedUser: null,
        selectedPost: null
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

// Mock API functions
const mockApi = {
  async fetchUsers(): Promise<User[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Failed to fetch users');
    }
    
    return [
      { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', username: 'bobjohnson' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', username: 'alicebrown' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', username: 'charliewilson' }
    ];
  },

  async fetchPosts(): Promise<Post[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random error (15% chance)
    if (Math.random() < 0.15) {
      throw new Error('Failed to fetch posts');
    }
    
    return [
      { id: 1, title: 'Getting Started with React', body: 'React is a powerful library for building user interfaces...', userId: 1 },
      { id: 2, title: 'Understanding Hooks', body: 'Hooks are a new addition in React 16.8...', userId: 2 },
      { id: 3, title: 'State Management with Redux', body: 'Redux is a predictable state container...', userId: 1 },
      { id: 4, title: 'TypeScript Best Practices', body: 'TypeScript adds static typing to JavaScript...', userId: 3 },
      { id: 5, title: 'Modern JavaScript Features', body: 'ES6+ brings many new features to JavaScript...', userId: 2 },
      { id: 6, title: 'CSS Grid Layout', body: 'CSS Grid is a powerful layout system...', userId: 4 },
      { id: 7, title: 'Web Performance Optimization', body: 'Performance is crucial for user experience...', userId: 5 },
      { id: 8, title: 'Testing React Components', body: 'Testing is essential for maintaining code quality...', userId: 3 }
    ];
  }
};

export default function AsyncReducer() {
  const [state, dispatch] = useReducer(asyncReducer, initialState);

  // Fetch users
  const fetchUsers = async () => {
    dispatch({ type: 'FETCH_USERS_START' });
    try {
      const users = await mockApi.fetchUsers();
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_USERS_ERROR', 
        payload: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    dispatch({ type: 'FETCH_POSTS_START' });
    try {
      const posts = await mockApi.fetchPosts();
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: posts });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_POSTS_ERROR', 
        payload: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  // Auto-fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (user: User) => {
    dispatch({ type: 'SELECT_USER', payload: user });
  };

  const handlePostSelect = (post: Post) => {
    dispatch({ type: 'SELECT_POST', payload: post });
  };

  const handleClearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const renderLoadingSpinner = () => (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner} />
    </div>
  );

  const renderError = (error: string) => (
    <div className={styles.errorMessage}>
      <strong>Error:</strong> {error}
    </div>
  );

  return (
    <div className={`${styles.container} ${styles.containerWide}`}>
      <h2 className={styles.counterDisplayCentered}>Async State Management with useReducer</h2>

      {/* Control Buttons */}
      <div className={`${styles.buttonGroup} ${styles.buttonGroupAsync}`}>
        <button
          onClick={fetchUsers}
          disabled={state.users.loading}
          className={`${styles.button} ${state.users.loading ? styles.buttonDisabled : styles.buttonPrimary}`}
        >
          {state.users.loading ? 'Loading Users...' : 'Fetch Users'}
        </button>

        <button
          onClick={fetchPosts}
          disabled={state.posts.loading}
          className={`${styles.button} ${state.posts.loading ? styles.buttonDisabled : styles.buttonSuccess}`}
        >
          {state.posts.loading ? 'Loading Posts...' : 'Fetch Posts'}
        </button>

        <button
          onClick={handleClearSelection}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Clear Selection
        </button>

        <button
          onClick={handleReset}
          className={`${styles.button} ${styles.buttonDanger}`}
        >
          Reset All
        </button>
      </div>

      <div className={styles.asyncGrid}>
        {/* Users Section */}
        <div className={styles.asyncSection}>
          <h3 className={`${styles.asyncSectionHeader} ${styles.asyncSectionHeaderUsers}`}>
            Users ({state.users.data.length})
          </h3>

          {state.users.loading && renderLoadingSpinner()}
          {state.users.error && renderError(state.users.error)}
          
          {!state.users.loading && !state.users.error && (
            <div className={styles.asyncSectionContent}>
              {state.users.data.map(user => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className={`${styles.asyncItem} ${state.selectedUser?.id === user.id ? styles.asyncItemSelected : ''}`}
                >
                  <h4 className={styles.asyncItemTitle}>{user.name}</h4>
                  <p className={styles.asyncItemSubtitle}>
                    @{user.username}
                  </p>
                  <p className={styles.asyncItemMeta}>
                    {user.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className={styles.asyncSection}>
          <h3 className={`${styles.asyncSectionHeader} ${styles.asyncSectionHeaderPosts}`}>
            Posts ({state.posts.data.length})
          </h3>

          {state.posts.loading && renderLoadingSpinner()}
          {state.posts.error && renderError(state.posts.error)}
          
          {!state.posts.loading && !state.posts.error && (
            <div className={styles.asyncSectionContent}>
              {state.posts.data.map(post => (
                <div
                  key={post.id}
                  onClick={() => handlePostSelect(post)}
                  className={`${styles.asyncItem} ${state.selectedPost?.id === post.id ? styles.asyncItemSelectedPost : ''}`}
                >
                  <h4 className={styles.asyncItemTitle}>{post.title}</h4>
                  <p className={styles.asyncItemSubtitle}>
                    {post.body.substring(0, 100)}...
                  </p>
                  <p className={styles.asyncItemMeta}>
                    User ID: {post.userId}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selection Details */}
      {(state.selectedUser || state.selectedPost) && (
        <div className={styles.selectionDetails}>
          <h3 className={styles.selectionTitle}>Selection Details</h3>
          
          {state.selectedUser && (
            <div className={styles.selectionSection}>
              <h4 className={styles.selectionSectionTitle}>Selected User:</h4>
              <div className={styles.selectionContent}>
                <p><strong>Name:</strong> {state.selectedUser.name}</p>
                <p><strong>Username:</strong> @{state.selectedUser.username}</p>
                <p><strong>Email:</strong> {state.selectedUser.email}</p>
                <p><strong>ID:</strong> {state.selectedUser.id}</p>
              </div>
            </div>
          )}

          {state.selectedPost && (
            <div className={styles.selectionSection}>
              <h4 className={styles.selectionSectionTitlePost}>Selected Post:</h4>
              <div className={styles.selectionContent}>
                <p><strong>Title:</strong> {state.selectedPost.title}</p>
                <p><strong>Body:</strong> {state.selectedPost.body}</p>
                <p><strong>User ID:</strong> {state.selectedPost.userId}</p>
                <p><strong>Post ID:</strong> {state.selectedPost.id}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.explanationSection}>
        <h4>useReducer Benefits for Async State:</h4>
        <ul className={styles.explanationList}>
          <li><strong>Loading States:</strong> Centralized management of loading indicators</li>
          <li><strong>Error Handling:</strong> Consistent error state management across async operations</li>
          <li><strong>Data Management:</strong> Predictable updates to data after async operations</li>
          <li><strong>Complex State:</strong> Handles multiple related async operations</li>
          <li><strong>Debugging:</strong> Easy to track state changes through actions</li>
          <li><strong>Testing:</strong> Pure reducer functions are easy to test</li>
        </ul>
        
        <h4>Key Features:</h4>
        <ul className={styles.explanationList}>
          <li><strong>Simulated API:</strong> Mock API with random errors to demonstrate error handling</li>
          <li><strong>Loading Indicators:</strong> Visual feedback during async operations</li>
          <li><strong>Error Display:</strong> Clear error messages for failed operations</li>
          <li><strong>Selection State:</strong> Manages selected items across different data types</li>
          <li><strong>Reset Functionality:</strong> Ability to reset all state to initial values</li>
        </ul>
      </div>
    </div>
  );
} 