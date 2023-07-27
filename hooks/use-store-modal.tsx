import  { create } from "zustand";

/* The `interface useStoreModalStore` is defining the structure or shape of the store object that will
be created using Zustand. It specifies that the store object will have three properties: */
interface useStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

/* The code `export const useStoreModal = create<useStoreModalStore>((set) => ({ isOpen: false, onOpen:
() => set({ isOpen: true}), onClose: () => set({isOpen: false}) }));` is creating a custom hook
called `useStoreModal` using the Zustand library. */
export const useStoreModal = create<useStoreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false})
}));

