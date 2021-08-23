import axios from 'axios'
//biblioteca que faz comunicação com back-end
const api = axios.create({
    baseURL: 'http://localhost:3002',
    validateStatus: false
})

export default api;