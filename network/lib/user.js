import axiosClient from "../apiClient";
import axiosAuthedClient from "../apiAuthedClient";

export function postUserLogin(data){
    return axiosClient.post('/users/login', JSON.stringify(data));
}

export function postUserRegister(data){
    return axiosClient.post('/users', JSON.stringify(data));
}

export function getUser(){
    return axiosAuthedClient.get('/user');
}

export function putUserUpdate(data){
    return axiosAuthedClient.put('/user', JSON.stringify(data));
}