"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Billboard } from "@prisma/client"
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
import ImageUpload from "@/components/ui/image-upload"

/* The `formSchema` constant is defining a validation schema using the `zod` library. It specifies that
the `label` and `imageUrl` fields should be strings with a minimum length of 1 character. This
schema will be used to validate the form input values before submitting the form. */
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>

/* The `BillboardFormProps` interface is defining the props that can be passed to the `BillboardForm`
component. It has a single property `initialData` which is of type `Billboard | null`. This prop is
used to provide initial data for the form, allowing the form to be used for both creating new
billboards and editing existing billboards. If `initialData` is `null`, it indicates that the form
should be used for creating a new billboard. If `initialData` is of type `Billboard`, it indicates
that the form should be used for editing an existing billboard and the initial values of the form
fields should be populated with the data from the `Billboard` object. */
interface BillboardFormProps {
    initialData: Billboard | null;
};

/* The code is defining a React functional component called `BillboardForm`. It takes in a prop called
`initialData` which can be of type `Billboard` or `null`. */
export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
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

    /* These lines of code are defining variables that are used to determine the text and behavior of
    the form based on whether the `initialData` prop is provided or not. */
    const title = initialData ? "Edit Billboard" : "Create billboard";
    const description = initialData ? "Edit a Billboard" : "Add new billboard";
    const toastMessage = initialData ? "Billboard updated" : "Billboard created.";
    const action = initialData ? "Save changes" : "Create";

    /* The code `const form = useForm<BillboardFormValues>({ resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: '', imageUrl: '' } });` is initializing a form using the
    `useForm` hook from the `react-hook-form` library. */
    const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
        label: '',
        imageUrl: ''
    }
    });

    /**
    * The function onSubmit is used to submit form data to create or update a billboard, and it handles
    * success and error cases.
    * @param {BillboardFormValues} data - The `data` parameter is of type `BillboardFormValues`, which
    * is an object containing the values of a billboard form.
    */
    const onSubmit = async (data: BillboardFormValues) => {
    try {
        setLoading(true);

        /* The code block is checking if the `initialData` prop is provided or not. If `initialData` is
        truthy, it means that the form is being used to edit an existing billboard. In this case, it
        sends a PATCH request to update the billboard using the `axios.patch` method. The URL for the
        request is constructed using the `params.storeId` and `params.billboardId` values from the
        URL parameters. The `data` object contains the updated values of the form fields. */
        if (initialData) {
            
            /* The code `await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,
            data);` is sending a PATCH request to update a specific billboard in the API. */
            await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
        
        } else {
            /* The code `await axios.post(`/api/${params.storeId}/billboards`, data);` is sending a
            POST request to create a new billboard in the API. The URL for the request is
            constructed using the `params.storeId` value from the URL parameters. The `data` object
            contains the values of the form fields for the new billboard. */
            await axios.post(`/api/${params.storeId}/billboards`, data);
        }

        /* The `router.refresh()` function is used to refresh the current page. It is typically used
        when you want to reload the current page and update its content without navigating to a
        different page. In the given code, `router.refresh()` is called after a successful form
        submission or deletion of a billboard. It is used to refresh the page and update the list of
        billboards displayed on the page after a change has been made. */
        router.refresh();

        /* The `router.push(`/${params.storeId}/billboards`);` code is used to navigate to a specific
        page in the Next.js application. It redirects the user to the `/storeId/billboards` page,
        where `storeId` is a dynamic parameter obtained from the URL. This navigation is typically
        triggered after a successful form submission or deletion of a billboard. */
        router.push(`/${params.storeId}/billboards`);

        /* `toast.success(toastMessage);` is displaying a success toast notification with the message
        `toastMessage`. */
        toast.success(toastMessage);
        
    } 
    /* The `catch` block is used to handle any errors that occur during the execution of the `try`
    block. In this specific code, if an error occurs, it will display an error toast notification
    with the message "Something went wrong." using the `toast.error` function. */
    catch (error: any) {

        toast.error('Something went wrong.');

    } finally {

        setLoading(false);
    }
    };

    /**
     * The function `onDelete` is an asynchronous function that deletes a billboard, refreshes the
     * page, redirects to the home page, and displays a success message if successful, or an error
     * message if there are categories still using the billboard.
     */
    const onDelete = async () => {
    try {
        /* `setLoading(true);` is setting the value of the `loading` state variable to `true`. This is
        typically used to indicate that a loading state is active, such as when a form is being
        submitted or an API request is being made. By setting `loading` to `true`, it can trigger UI
        changes, such as disabling buttons or showing a loading spinner, to provide feedback to the
        user that an operation is in progress. */
        setLoading(true);

        /* The code `await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);` is
        sending a DELETE request to the specified API endpoint to delete a specific billboard. The
        URL for the request is constructed using the `params.storeId` and `params.billboardId`
        values from the URL parameters. This request is typically used to delete a billboard from
        the database or perform any necessary cleanup actions. */
        await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);

        /* The above code is refreshing the router. */
        router.refresh();

        /* The above code is using the `router` object to navigate to the root route, which is
        represented by `'/'`. */
        router.push('/');

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
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Background Image</FormLabel>
                        <FormControl>
                        <ImageUpload 
                            value={field.value ? [field.value] : []}
                            disabled={loading}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}

                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-8">
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                        <Input disabled={loading} placeholder="Billboard Label" {...field} />
                        </FormControl>
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
        <Separator />
    </>
    );
};