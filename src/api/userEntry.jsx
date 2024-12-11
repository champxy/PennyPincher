import axios from "axios";


export const getUserEntries = async (token) => await axios.get('http://localhost:5069/api/entries', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const addUserEntry = async (token, form) => await axios.post('http://localhost:5069/api/entries', form, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const getUserEntriesperday = async (token, date) => {
    return await axios.get(`http://localhost:5069/api/entries/day`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            date: date 
        }
    });
};


export const getUserEntriespermonth = async (token, month, year) => {
    return await axios.get(`http://localhost:5069/api/entries/month`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            month: month,
            year: year
        }
    });
};
