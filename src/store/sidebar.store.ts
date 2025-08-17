import { create } from "zustand";

type SidebarState = {
    isActive: boolean;
    setActive: (status: boolean) => void;
};

export const useAuthStore = create<SidebarState>(
    (set) => ({
        isActive: false,
        setActive: (status) => set(({ isActive: status })),
    })
)