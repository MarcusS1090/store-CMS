"use client";

import { StoreModal } from "@/components/modals/store-modal";

import { useEffect, useState } from "react";

/* The code is defining a functional component called `ModalProvider`. */
export const ModalProvider = () => {

    const [ isMountend, setIsMounted ] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    /* The code `if (!isMountend) { return null; }` is checking the value of the `isMountend` state
    variable. If the value is `false`, it means that the component has not yet been mounted, so the
    code returns `null`. This effectively prevents the component from rendering anything until it
    has been mounted. Once the component is mounted and the `isMountend` value is updated to `true`
    in the `useEffect` hook, the component will render its content. */
    if (!isMountend) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    )
}