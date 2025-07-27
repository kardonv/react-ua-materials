import axios from 'axios';
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FetchUsersRequestAction,
    FetchUsersSuccessAction,
    FetchUsersFailureAction,
    User,
    Action,
} from './userTypes';
import { Dispatch } from 'redux';

export const fetchUsersRequest = (): FetchUsersRequestAction => {
    return {
        type: FETCH_USERS_REQUEST,
    };
}

export const fetchUsersSuccess = (users: number[]): FetchUsersSuccessAction => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    };
}

export const fetchUsersFailure = (error: string): FetchUsersFailureAction => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    };
}

export const fetchUsers = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map((user: User) => user.name);

                setTimeout(() => {
                    dispatch(fetchUsersSuccess(users));
                }, 2000);
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message));
            });
    };
}