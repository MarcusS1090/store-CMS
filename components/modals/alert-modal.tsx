"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

/* The `interface AlertModalProps` defines the props that can be passed to the `AlertModal` component.
It specifies that the component expects the following props: */
interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal:  React.FC<AlertModalProps> = ({
    /* `isOpen`, `onClose`, `onConfirm`, and `loading` are props that are passed to the `AlertModal`
    component. */
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    /* The line `const [isMounted, setIsMounted] = useState(false);` is declaring a state variable
    called `isMounted` and a function to update its value called `setIsMounted`. The initial value
    of `isMounted` is set to `false` using the `useState` hook. */
    const [isMounted, setIsMounted] = useState(false);

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to set the value of the `isMounted` state variable to `true` when
    the component is mounted. */
    useEffect(() => {
        setIsMounted(true);
    }, []);

    /* The code `if (!isMounted) { return null; }` is checking if the component is mounted or not. If
    the component is not mounted, it returns `null`, effectively rendering nothing. This is a common
    pattern used to prevent rendering or executing any code before the component is fully mounted
    and ready to be interacted with. */
    if (!isMounted) {
        return null;
    }

    /* The `return` statement is rendering JSX code, which represents the structure and content of the
    component's UI. In this case, it is rendering a `Modal` component with a title and description,
    and two `Button` components for canceling or continuing an action. */
    return (
        <Modal
            title="Are you sure?"
            description="this action cannot be undone."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div
                className="pt-6 space-x-2 flex items-center justify-end w-full"
            >
                <Button 
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                    >
                    Cancelar
                </Button>
                <Button
                    disabled={loading}
                    variant="destructive"
                    onClick={onConfirm}
                >
                    Continuar
                </Button>
            </div>
        </Modal>
    )
};