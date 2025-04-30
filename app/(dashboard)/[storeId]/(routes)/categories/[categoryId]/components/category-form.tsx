"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import {  Billboard, Category } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from "@/components/ui/select"



const formSchema = z.object({
    name: z.string().min(2),
    billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>


interface CategoryFormProps {
    initialData: Category | null;
    billboards: Billboard[];
};


export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    billboards
}) => {
    /* The line `const params = useParams();` is using the `useParams` hook from the `next/navigation`
    package to get the dynamic parameters from the URL. These parameters are typically used to
    identify a specific resource or entity in the application. In this case, it is likely that the
    `params` object contains the `storeId` and `billboardId` which are used in the API routes to
    perform CRUD operations on billboards. */
    const params = useParams();

    /* The line `const router = useRouter();` is using the `useRouter` hook from the `next/navigation`
    package to access the router object. The router object allows you to programmatically navigate
    between pages in your Next.js application. It provides methods like `push`, `replace`, and
    `back` to navigate to different pages or modify the browser history. In this code, the `router`
    object is likely being used to navigate to different pages after a form submission or deletion
    of a billboard. */
    const router = useRouter();

    /* The line `const [open, setOpen] = useState(false);` is declaring a state variable called `open`
    and a corresponding setter function called `setOpen`. The initial value of the `open` state
    variable is `false`. */
    const [open, setOpen] = useState(false);

    /* The line `const [loading, setLoading] = useState(false);` is declaring a state variable called
    `loading` and a corresponding setter function called `setLoading`. The initial value of the
    `loading` state variable is `false`. This state variable is used to track whether a loading
    state is active or not. It can be updated using the `setLoading` function to toggle the loading
    state. */
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Editar categoria" : "Crear categoria";
    const description = initialData ? "Editar categoria" : "Añadir categoria";
    const toastMessage = initialData ? "Categoria actualizada" : "Categoria creada";
    const action = initialData ? "Guardar Cambios" : "Crear categoria";


    const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
        name: '',
        billboardId: ''
    }
    });

    
    const onSubmit = async (data: CategoryFormValues) => {
    try {
        setLoading(true);

        if (initialData) {
            
            await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
        
        } else {

            await axios.post(`/api/${params.storeId}/categories`, data);
        }

        /* The `router.refresh()` function is used to refresh the current page. It is typically used
        when you want to reload the current page and update its content without navigating to a
        different page. In the given code, `router.refresh()` is called after a successful form
        submission or deletion of a billboard. It is used to refresh the page and update the list of
        billboards displayed on the page after a change has been made. */
        router.refresh();

        router.push(`/${params.storeId}/categories`);

        /* `toast.success(toastMessage);` is displaying a success toast notification with the message
        `toastMessage`. */
        toast.success(toastMessage);
        
    } 
    /* The `catch` block is used to handle any errors that occur during the execution of the `try`
    block. In this specific code, if an error occurs, it will display an error toast notification
    with the message "Something went wrong." using the `toast.error` function. */
    catch (error: any) {

        toast.error('Algo salio mal.');

    } finally {

        setLoading(false);
    }
    };

    const onDelete = async () => {
    try {

        setLoading(true);


        await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);

        /* The above code is refreshing the router. */
        router.refresh();

        router.push(`/${params.storeId}/categories`);

        toast.success('Categoria eliminada.');

    } 

    catch (error: any) {

        toast.error('Asegurate de haber eliminado todos los productos que usan esta categoria primero.');

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
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
    />
        <div className="flex items-center justify-between">
        <Heading 
            title={title}
            description={description} 
        />
        {initialData && (
        <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
        >
            <Trash className="h-4 w-4" />
        </Button>
        )}
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                        <Input disabled={loading} placeholder="Nombre de la categoria" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="billboardId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Catelera</FormLabel>
                        <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Selecciona una cartelera"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {billboards.map((billboard) => (
                                    <SelectItem
                                        key={billboard.id}
                                        value={billboard.id}
                                    >
                                        {billboard.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                {action}
                </Button>
            </form>
        </Form>
    </>
    );
};