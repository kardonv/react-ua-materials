import { AsyncAction, AsyncState } from "../types/AsyncReducer";

export const initialState: AsyncState = {
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

export function asyncReducer(state: AsyncState, action: AsyncAction): AsyncState {
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