"use client";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();

    /* The line `const [loading, setLoading] = useState(false);` is using the `useState` hook from
    React to create a state variable called `loading` and a corresponding setter function called
    `setLoading`. */
    const [loading, setLoading] = useState(false);

    /* The code `const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema),
    defaultValues: { name: "", }, });` is creating a form using the `useForm` hook from the
    `react-hook-form` library. */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    
    
    
    /**
     * The `onSubmit` function is responsible for handling the submission of form data, making a POST
     * request to the `/api/stores` endpoint, and logging the response data.
     * @param values - The `values` parameter is an object that represents the form data that will be
     * submitted. It is inferred from the `formSchema` using the `z.infer` function.
     */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        /* The code block is handling the submission of the form data. */
        try {
            setLoading(true);

            /* The line `const response = await axios.post('/api/stores', values);` is making a POST
            request to the `/api/stores` endpoint with the `values` object as the request payload.
            The `axios.post` function is a part of the Axios library, which is used to send HTTP
            requests. */
            const response = await axios.post('/api/stores', values);

            /* `window.location.assign(`/${response.data.id}`);` is used to redirect the user to a new
            URL. In this case, it is redirecting the user to a URL that includes the `id` property
            from the `response.data` object. The `response.data` object is the data returned from
            the POST request to the `/api/stores` endpoint. */
            window.location.assign(`/${response.data.id}`);

        } catch (error) {
            toast.error("Something went wrong.");
            
        } finally {
            setLoading(false);
        }
    };

    return (
    /* The code you provided is rendering a modal component with a form inside it. Here's a breakdown
    of what each part does: */
    <Modal
        title="Crear tienda"
        description="Añade una nueva tienda con categorias, productos, y más."
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nombre
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Nombre de la tienda"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div 
                            className="
                                pt-6 
                                space-x-2
                                flex
                                items-center
                                justify-end
                                w-full
                            "
                        >
                            <Button
                                disabled={loading}
                                variant="outline"
                                onClick={storeModal.onClose}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                disabled={loading}
                                type="submit"
                            >
                                Continuar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    )

}