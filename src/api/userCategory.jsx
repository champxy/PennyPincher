import axios from "axios";


export const getUserCategories = async (token) => await axios.get('http://localhost:5069/api/categories', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const addUserCategory = async (token, name) => await axios.post('http://localhost:5069/api/categories', name, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const deleteUserCategory = async (token, id) => await axios.delete(`http://localhost:5069/api/categories/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})