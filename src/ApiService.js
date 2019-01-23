import axios from 'axios'
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
const API_URL = 'http://goki.gq:3000'

export class ApiService {
    constructor(){
    }
    get(query){
        const url = `${API_URL}/api/${query}`
        return axios.get(url).then(response => response.data)
    }
    add(query, payload){
        const url = `${API_URL}/api/${query}`
        return axios.post(url, payload)
    }
    delete(query, user_id){
        const url = `${API_URL}/api/${query}/${user_id}`
        return axios.delete(url)
    }
}