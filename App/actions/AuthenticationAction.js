import { REQUEST_USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE  } from './ActionTypes';
import * as User from '../services/json/users.json';
import * as Employees from '../services/json/employees.json';

const RequestUserLogin = () => (
    {
        type: REQUEST_USER_LOGIN
    }
);

const UserLoginSuccess = () => (
    {
        type: USER_LOGIN_SUCCESS,
        payload: { status: 'Login_Success', employees: Employees}
    }
);

const UserLoginFailure = () => (
    {
        type: USER_LOGIN_FAILURE,
        payload: { status: 'Login_Failed', employees: []}
    }
);

const getUser = async (userData) => {
    const users = await User;
    if(users.username === userData.username && users.password === userData.password) {
        return true;
    } else {
        return false;
    }
}

export function loginUser(data) {
    return function (dispatch) {
        dispatch(RequestUserLogin());
        return getUser(data)
            .then((response) => {
                setTimeout(() => {
                    if (response) {
                        dispatch(UserLoginSuccess());
                    } else if(!response) {
                        dispatch(UserLoginFailure());
                    }
                }, 1000);
            }).catch(() => {
                dispatch(UserLoginFailure());
            });
    }
}

