"use client";

import axios from "axios";

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { BillboardColumn } from "./columns";
import {
    Copy,
    Edit,
    MoreHorizontal,
    Trash
} from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
    data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps>  = ( {
    data
}) => {

    /* The line `const router = useRouter();` is importing the `useRouter` hook from the
    `next/navigation` module and assigning it to the `router` constant. */
    const router = useRouter();
    
    /* The line `const params = useParams();` is using the `useParams` hook from the `next/navigation`
    module to retrieve the URL parameters. */
    const params = useParams();

    /* The line `const [ loading, setLoading ] = useState(false);` is declaring a state variable called
    `loading` and a corresponding function called `setLoading` to update the value of `loading`. The
    initial value of `loading` is set to `false`. */
    const [ loading, setLoading ] = useState(false);

    /* The line `const [ open, setOpen ] = useState(false);` is declaring a state variable called
    `open` and a corresponding function called `setOpen` to update the value of `open`. The initial
    value of `open` is set to `false`. */
    const [ open, setOpen ] = useState(false);

    /**
     * The function `onCopy` copies a given string to the clipboard and displays a success toast
     * message.
     * @param {string} id - The `id` parameter is a string that represents the Billboard ID that needs
     * to be copied to the clipboard.
     */
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Billboard ID copied to clipboard.');
    }

    const onDelete = async () => {
        try {
            /* `setLoading(true);` is setting the value of the `loading` state variable to `true`. This is
            typically used to indicate that a loading state is active, such as when a form is being
            submitted or an API request is being made. By setting `loading` to `true`, it can trigger UI
            changes, such as disabling buttons or showing a loading spinner, to provide feedback to the
            user that an operation is in progress. */
            setLoading(true);
    
            
            /* The line `await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);` is making
            a DELETE request to the specified API endpoint. The endpoint is constructed using
            template literals to include the `storeId` and `data.id` values. The `axios.delete`
            function is an HTTP client that sends the DELETE request to the specified URL. The
            `await` keyword is used to wait for the response from the server before proceeding with
            the next line of code. */
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
    
            /* The above code is refreshing the router. */
            router.refresh();

    
            toast.success('Billboard deleted.');
    
        } 
        /* The above code is a catch block in a TypeScript React application. It is catching any error
        that occurs and displaying an error message using the toast.error() function. The error
        message being displayed is "Make sure you removed all categories using this billboard." */
        catch (error: any) {
    
            toast.error('Make sure you removed all categories using this billboard.');
    
        } finally {
    
            /* The above code is setting the value of the variable "loading" to false. */
            setLoading(false);
    
           /* The above code is setting the value of the variable "setOpen" to false. */
            setOpen(false);
        }
        }

    return ( 
        <>
            <AlertModal 
                isOpen={open}
                onClose={()=>setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> 
                        Copy Id
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() =>router.push(`/${params.storeId}/billboards/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" /> 
                        Update
                    </DropdownMenuItem>
                
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> 
                        Delete
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
