export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface State {
    loading: boolean;
    users: number[];
    error: string;
}

export type ActionType = string;

export interface FetchUsersRequestAction {
    type: ActionType;
}

export interface FetchUsersSuccessAction {
    type: ActionType;
    payload: number[];
}

export interface FetchUsersFailureAction {
    type: ActionType;
    payload: string;
}

export type Action = FetchUsersRequestAction | FetchUsersSuccessAction | FetchUsersFailureAction;