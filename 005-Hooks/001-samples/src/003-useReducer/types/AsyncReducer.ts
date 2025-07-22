export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface AsyncState {
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

export type AsyncAction =
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