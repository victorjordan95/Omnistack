import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.24.111.97:3333'
})

export default api;