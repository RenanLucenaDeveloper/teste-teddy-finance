import { create } from "zustand";

export type SidebarState = {
    isActive: boolean;
    setActive: (status: boolean) => void;
};

export const useSidebarStore = create<SidebarState>(
    (set) => ({
        isActive: false,
        setActive: (status) => set(({ isActive: status })),
    })
)