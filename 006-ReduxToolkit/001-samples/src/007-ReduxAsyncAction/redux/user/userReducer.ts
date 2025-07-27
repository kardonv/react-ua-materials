import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, State } from './userTypes'

const initialState: State = {
    loading: false,
    users: [],
    error: '',
}

export const userReducer = (state: State = initialState, action: any): State => {
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