export interface User {
    id: number;
    name: string;
    email: string;
    // Add other user properties as needed
}

export interface State {
    loading: boolean;
    users: number[]; // Based on the code, it stores user IDs
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