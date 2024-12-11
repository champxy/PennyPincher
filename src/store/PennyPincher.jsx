import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { login, register } from '../api/auth';
import { getUserCategories } from '../api/userCategory';


const pennyPincherStore = (set,get) => ({
    user: null,
    token: null,
    logout: null,
    categoryuse : [],
    actionLogin: async (formData) => {
        try {
            const res = await login(formData);
            // console.log(res);
            if (res.data.token) {
                set({ user: res.data.payload, token: res.data.token });
            }
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    actionRegister: async (formData) => {
        try {
            const res = await register(formData);
            // console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }, actionChangelogout: (value) => {
        console.log(value);
        set({ logout: value });
    },
    actionlogout: () => {
        set({ user: null, token: null, logout: true });
        toast.success("Logout successfully");
    },
    actionCheckUseCategory: async (value,id) => {
        set({ categoryuse: {name: value, id: id} });
    }
});


const usePennyPincherStore = create(
    persist(pennyPincherStore, {
        name: 'pennyPincher',
        storage: createJSONStorage(() => localStorage),
    })
);

export default usePennyPincherStore;