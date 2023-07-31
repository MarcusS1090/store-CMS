"use client";


import { store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z  from "zod";

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
     * The function onSubmit logs the data passed to it.
     * @param {SettingsFormValues} data - The `data` parameter is of type `SettingsFormValues`.
     */
    const onSubmit = async (data: SettingsFormValues) => {
        console.log(data);
        
    }



    return (
        <>
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
        </>
    )
}