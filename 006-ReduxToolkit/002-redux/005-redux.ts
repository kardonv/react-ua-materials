import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import axios from 'axios';
import * as reduxLogger from 'redux-logger';

import { State, FetchUsersRequestAction, FetchUsersSuccessAction, FetchUsersFailureAction, User } from './types/005-redux';

const logger = reduxLogger.createLogger();

const initialState: State= {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// #region action creators

const fetchUsersRequest = (): FetchUsersRequestAction => {
    return {
        type: FETCH_USERS_REQUEST,
    };
}

const fetchUsersSuccess = (users: number[]): FetchUsersSuccessAction => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    };
}

const fetchUsersFailure = (error: string): FetchUsersFailureAction => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    };
}

// #endregion

// #region reducer

const reducer = (state: State = initialState, action: any): State => {
    switch (action.type) {
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true,
        }
        case FETCH_USERS_SUCCESS: return {
            loading: false,
            users: action?.payload,
            error: '',
        }
        case FETCH_USERS_FAILURE: return {
            loading: false,
            users: [],
            error: action.payload,
        }
        default: return state;
    }
}

// #endregion

// #region thunk
function fetchUsers() {
    return function (dispatch: any) {
        dispatch(fetchUsersRequest());
        axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map((user: User) => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message));
            });
    }
}
// #endregion

// #region store

const store = createStore(reducer, applyMiddleware(logger, thunk));
// store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());

// #endregion