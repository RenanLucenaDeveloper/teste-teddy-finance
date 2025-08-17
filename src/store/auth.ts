import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'
import type { loginData } from "../dtos/login-dto";

type AuthState = {
    user: userState;
    login: (loginData: loginData) => void;
    logout: () => void;
};

type userState = {
    name: string;
    isAuthenticated: boolean;
};

const initialState: userState = {
    name: '',
    isAuthenticated: false
}

export const useAuthStore = create<AuthState>()(
    persist<AuthState>(
        (set) => ({
            user: initialState,
            login: (loginData) => set(() => ({ user: { ...loginData, isAuthenticated: true } })),
            logout: () => set(() => ({ user: initialState })),
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export const useAuthData = () => useAuthStore((state) => state.user)
export const useLogin = () => useAuthStore((state) => state.login)