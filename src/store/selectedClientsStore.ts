import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'
import type { User } from "../types/user-type";

export type selectedClientsState = {
    selectedClients: User[];
    select: (client: User) => void;
    remove: (client: User) => void;
    clearAll: () => void;
};

export const useSelectedClientsStore = create<selectedClientsState>()(
    persist<selectedClientsState>(
        (set) => ({
            selectedClients: [],

            select: (client) => set((state) => 
                state.selectedClients.some((item) => client.id === item.id)
                ? state 
                : { selectedClients: [...state.selectedClients, client] }
            ),

            remove: (client) => set((state) => ({
                selectedClients: state.selectedClients.filter((item) => client.id !== item.id)
            })),

            clearAll: () => set(() => ({ selectedClients: [] })),
        }),
        {
            name: 'selectedClients',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
