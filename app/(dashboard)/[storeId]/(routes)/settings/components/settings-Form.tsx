"use client";

import axios from "axios";

import { store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z  from "zod";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";

/* The `SettingsFormProps` interface is defining the props that can be passed to the `SettingsForm`
component. It has a single property `initialData` of type `store`. This prop is used to pass initial
data to the form component. */
interface SettingsFormProps {
    initialData: store;
}

/* The code `const formSchema = z.object({ name: z.string().min(1) });` is defining a validation schema
using the `zod` library. */
const formSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues =  z.infer<typeof formSchema>

export const SettingsForm:React.FC<SettingsFormProps> = ({initialData}) => {

    const params = useParams();
    const router = useRouter();
    
    /* The code `const [ loading, setLoading ] = useState(false);` is using the `useState` hook to
    create a state variable called `loading` and a corresponding setter function called
    `setLoading`. The initial value of `loading` is set to `false`. This state variable can be used
    to keep track of whether a certain operation is currently in progress or not. */
    const [ loading, setLoading ] = useState(false);
    
    /* The code `const [ open, setOpen ] = useState(false);` is using the `useState` hook to create a
    state variable called `open` and a corresponding setter function called `setOpen`. The initial
    value of `open` is set to `false`. This state variable can be used to keep track of whether a
    certain component or element is open or closed. The `setOpen` function can be used to update the
    value of `open` and trigger a re-render of the component. */
    const [ open, setOpen ] = useState(false);


    /* The code `const form = useForm<SettingsFormValues>({ resolver: zodResolver(formSchema),
    defaultValues: initialData, });` is creating a form instance using the `useForm` hook from the
    `react-hook-form` library. */
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

        
    /**
     * The `onSubmit` function is an asynchronous function that sends a PATCH request to update a
     * store's settings, refreshes the page, displays a success message, and sets the loading state to
     * true.
     * @param {SettingsFormValues} data - The `data` parameter is of type `SettingsFormValues`, which
     * is the data that will be sent to the server for updating the store.
     */
    const onSubmit = async (data: SettingsFormValues) => {
        try {

            /* The code `axios.patch(`/api/stores/${params.storeId}`, data);` is sending a PATCH
            request to the server to update the settings of a store with the specified `storeId`.
            The `params.storeId` is a dynamic parameter that is obtained from the URL. The `data`
            parameter contains the updated settings that will be sent to the server. */
            axios.patch(`/api/stores/${params.storeId}`, data);

            /* `router.refresh();` is a function call that refreshes the current page. It is used in
            the `onSubmit` function to refresh the page after a successful update of the store's
            settings. This ensures that the updated data is immediately reflected on the page
            without the need for a full page reload. */
            router.refresh();

            /* `toast.success("Store updated.");` is displaying a success message to the user using a
            toast notification. The message "Store updated." will be shown in a toast notification,
            indicating that the store has been successfully updated. */
            toast.success("Store updated.");

            /* `setLoading(true);` is setting the value of the `loading` state variable to `true`. This
            is typically used to indicate that a certain operation or task is currently in progress.
            In this case, it is likely used to show a loading spinner or disable certain UI elements
            while the form submission is being processed. */
            setLoading(true);

        } catch (error) {

            toast.error("Something went wrong.");

        } finally {

            /* `setLoading(false);` is setting the value of the `loading` state variable to `false`.
            This is typically used to indicate that a certain operation or task has been completed
            or is no longer in progress. In this case, it is likely used to indicate that the form
            submission or deletion process has finished, and any loading spinners or disabled UI
            elements can be reverted back to their normal state. */
            setLoading(false);

        }
    };

    /**
     * The `onDelete` function is an asynchronous function that sends a DELETE request to the server to
     * delete a store, and then refreshes the page and displays a success message if the deletion is
     * successful, or displays an error message if there are any issues.
     */
    const onDelete =async () => {
        try {

            setLoading(true)

            /* The code `await axios.delete(`/api/stores/${params.storeId}`)` is sending a DELETE
            request to the server to delete a store with the specified `storeId`. The
            `params.storeId` is a dynamic parameter that is obtained from the URL. The `await`
            keyword is used to wait for the response from the server before proceeding with the next
            steps. */
            await axios.delete(`/api/stores/${params.storeId}`)

            /* `router.refresh();` is a function call that refreshes the current page. It is used in
            the `onSubmit` function to refresh the page after a successful update of the store's
            settings. This ensures that the updated data is immediately reflected on the page
            without the need for a full page reload. */
            router.refresh();

            /* `router.push("/")` is a function call that navigates the user to the specified route, in
            this case, the root route ("/"). It is used after a successful deletion of a store to
            redirect the user back to the homepage. */
            router.push("/");

            /* `toast.success("Store deleted.")` is displaying a success message to the user using a
            toast notification. The message "Store deleted." will be shown in a toast notification,
            indicating that the store has been successfully deleted. */
            toast.success("Store deleted.")

        } catch (error) {

            toast.error("Make sure you removed all products and categories first.");

        }finally {

            /* `setLoading(false);` is setting the value of the `loading` state variable to `false`.
            This is typically used to indicate that a certain operation or task has been completed
            or is no longer in progress. In this case, it is likely used to indicate that the form
            submission or deletion process has finished, and any loading spinners or disabled UI
            elements can be reverted back to their normal state. */
            setLoading(false);

            /* `setOpen(false);` is a function call that updates the value of the `open` state variable
            to `false`. This is typically used to close or hide a component or element that is
            controlled by the `open` state variable. In this specific code snippet, it is used to
            close the `AlertModal` component when the deletion process is finished or canceled. */
            setOpen(false);
        }
    
    };


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
                    title="Settings"
                    description="Manage store preference"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
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
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Store Name"
                                            {...field}
                                        />
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
                description={`${origin}/api${params.storeId}`}
                variant="public"
            />
        </>
    )
}