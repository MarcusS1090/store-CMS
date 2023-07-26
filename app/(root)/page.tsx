'use client';
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";


const SetupPage = () => {
    
    /* The code is using the `useStoreModal` hook to access the `onOpen` and `isOpen` values from the
    store. */
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
    effect is triggered whenever the `isOpen` or `onOpen` values change. */
    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <div className="p-4">
            Root Page
        </div>
    )
}

export default SetupPage;