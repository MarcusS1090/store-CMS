"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Store } from "@prisma/client"
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
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"

/* The `formSchema` constant is defining a validation schema using the `zod` library. It specifies that
the `name` field should be a string with a minimum length of 2 characters. This schema will be used
to validate the form input values. */
const formSchema = z.object({
    name: z.string().min(2),
});

type SettingsFormValues = z.infer<typeof formSchema>

/* The `SettingsFormProps` interface is defining the props that can be passed to the `SettingsForm`
component. It specifies that the `initialData` prop should be of type `store`. */
interface SettingsFormProps {
    initialData: Store;
};

/* The code block is defining a functional component called `SettingsForm` that takes in a prop called
`initialData` of type `store`. */
export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    /* The line `const params = useParams();` is using the `useParams` hook from the `next/navigation`
    package to get the dynamic parameters from the URL. These parameters are typically used to
    identify a specific resource or entity in the application. In this case, it is likely that
    `params` will contain the `storeId` parameter, which is used in the API calls to update and
    delete the store. */
    const params = useParams();
    /* The line `const router = useRouter();` is using the `useRouter` hook from the `next/navigation`
    package to access the router object. The router object allows you to programmatically navigate
    between pages in your Next.js application. It provides methods like `push`, `replace`, and
    `reload` to navigate to different pages or refresh the current page. In this code, the `router`
    object is used to refresh the current page after a successful update or deletion of the store. */
    const router = useRouter();
    /* The line `const origin = useOrigin();` is using the `useOrigin` custom hook to get the origin
    URL of the current application. The origin URL represents the base URL of the application,
    including the protocol (e.g., "http" or "https"), domain, and port number. */
    const origin = useOrigin();

    /* The line `const [open, setOpen] = useState(false);` is declaring a state variable called `open`
    and a corresponding setter function called `setOpen`. The initial value of the `open` state
    variable is `false`. */
    const [open, setOpen] = useState(false);
/* The line `const [loading, setLoading] = useState(false);` is declaring a state variable called
`loading` and a corresponding setter function called `setLoading`. The initial value of the
`loading` state variable is `false`. */
    const [loading, setLoading] = useState(false);

    /* The code `const form = useForm<SettingsFormValues>({ resolver: zodResolver(formSchema),
    defaultValues: initialData });` is initializing a form using the `useForm` hook from the
    `react-hook-form` library. */
    const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
    });

    /**
     * The `onSubmit` function is an asynchronous function that updates a store using a PATCH request,
     * displays a success message if the request is successful, and displays an error message if there
     * is an error.
     * @param {SettingsFormValues} data - The `data` parameter is of type `SettingsFormValues`, which
     * represents the values submitted in a form for updating store settings.
     */
    const onSubmit = async (data: SettingsFormValues) => {
    /* The code block is handling the submission of the form data to update a store. */
    try {
        setLoading(true);
        /* The code `await axios.patch(`/api/stores/${params.storeId}`, data);` is making a PATCH
        request to the `/api/stores/{storeId}` endpoint with the `data` object as the request
        payload. The `params.storeId` is a dynamic parameter that represents the ID of the store
        being updated. The `axios.patch` method is a part of the Axios library and is used to send
        an HTTP PATCH request to the specified URL. In this case, it is used to update the store
        settings with the provided data. The `await` keyword is used to wait for the response from
        the server before proceeding to the next line of code. */
        await axios.patch(`/api/stores/${params.storeId}`, data);
        router.refresh();
        toast.success('Store updated.');
    } catch (error: any) {
        toast.error('Something went wrong.');
    } finally {
        setLoading(false);
    }
    };

    /**
    * The `onDelete` function is used to delete a store and handle success and error messages.
    */
    const onDelete = async () => {
    try {
        setLoading(true);
        /* The code `await axios.delete(`/api/stores/${params.storeId}`);` is making a DELETE request
        to the `/api/stores/{storeId}` endpoint. The `params.storeId` is a dynamic parameter that
        represents the ID of the store being deleted. The `axios.delete` method is a part of the
        Axios library and is used to send an HTTP DELETE request to the specified URL. In this case,
        it is used to delete the store with the provided ID. The `await` keyword is used to wait for
        the response from the server before proceeding to the next line of code. */
        await axios.delete(`/api/stores/${params.storeId}`);
        router.refresh();
        router.push('/');
        toast.success('Store deleted.');
    } catch (error: any) {
        toast.error('Make sure you removed all products and categories first.');
    } finally {
        setLoading(false);
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
        <Heading title="Store settings" description="Manage store preferences" />
        <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
        >
            <Trash className="h-4 w-4" />
        </Button>
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                    <Input disabled={loading} placeholder="Store name" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
            </Button>
        </form>
        </Form>
        <Separator />
        <ApiAlert 
        title="NEXT_PUBLIC_API_URL" 
        variant="public" 
        description={`${origin}/api/${params.storeId}`}
        />
    </>
    );
};