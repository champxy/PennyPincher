import axios from 'axios';

export const login = async (form) => await axios.post('http://localhost:5069/api/login', form, {
})

export const register = async (form) => await axios.post('http://localhost:5069/api/register', form, {
})

export const currentUser = async (token) => await axios.get('http://localhost:5069/api/current-user', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})