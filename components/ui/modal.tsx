'use client';

import { Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle
    } from "@/components/ui/dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ 
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    /**
     * The onChange function checks if a boolean value is false and calls the onClose function if it
     * is.
     * @param {boolean} open - A boolean value indicating whether something is open or not.
     */
    const onChange = (open:boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        /* The code you provided is defining a Modal component using the Dialog, DialogContent,
        DialogHeader, DialogTitle, and DialogDescription components from the
        "@/components/ui/dialog" module. */
        <Dialog
            open={isOpen}
            onOpenChange={onChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}