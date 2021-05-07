import axios from 'axios';
import{
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login',dataToSubmit) //서버에 보냄.
    .then(response=>response.data)

    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register',dataToSubmit) //서버에 보냄.
    .then(response=>response.data)

    return{
        type: REGISTER_USER,
        payload: request
    }
}