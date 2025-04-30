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

import { SizeColumn } from "./columns";
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
    data: SizeColumn
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


    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('ID del tamaño copiado en el portapapeles.');
    }

    const onDelete = async () => {
        try {

            setLoading(true);
    
            

            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
    
            /* The above code is refreshing the router. */
            router.refresh();

    
            toast.success('Tamaño eliminado.');
    
        } 

        catch (error: any) {
    
            toast.error('Asegúrate de que no haya productos usando este tamaño.');
    
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
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Acciones
                    </DropdownMenuLabel>
                    
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> 
                        Copiar ID
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() =>router.push(`/${params.storeId}/sizes/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" /> 
                        Actualizar
                    </DropdownMenuItem>
                
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> 
                        Eliminar
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
