import * as types from '../actions/ActionTypes';

const INITIAL_STATE = {
    loading: false
}

export const AuthenticationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.REQUEST_USER_LOGIN:
            return Object.assign({}, state, { loading: true }); 

        case types.USER_LOGIN_SUCCESS:
            return Object.assign({}, state, { loginresponse: action.payload.status, loading: false, employees: action.payload.employees });

        case types.USER_LOGIN_FAILURE:
            return Object.assign({}, state, { loginresponse: action.payload.status, loading: false });

        default:
            return state;
    }
}