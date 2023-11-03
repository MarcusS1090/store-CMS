"use client"

import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon} from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

/* The `interface StoreSwitcherProps` is extending the `PopoverTriggerProps` interface, which means it
inherits all the properties and types defined in `PopoverTriggerProps`. Additionally, it adds a new
property `items` of type `store[]`. */
interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];

};

export default function StoreSwitcher ({
    className,
    items = []

}: StoreSwitcherProps) {

    /* The line `const storeModal = useStoreModal();` is calling the `useStoreModal` hook and assigning
    its return value to the `storeModal` variable. The `useStoreModal` hook is a custom hook that
    likely provides functionality related to managing the state and behavior of a store modal
    component. */
    const storeModal = useStoreModal();

/* The line `const params = useParams();` is using the `useParams` hook from the `next/navigation`
package to access the parameters from the current route. */
    const params = useParams();

    /* `const router = useRouter();` is using the `useRouter` hook from the `next/navigation` package
    to access the router object. The router object allows you to programmatically navigate between
    pages in your Next.js application. */
    const router = useRouter();

    /* The code `const formattedItems = items.map((item) => ({ label: item.name, value: item.id }));`
    is creating a new array called `formattedItems` by mapping over the `items` array. */
    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }));

    /* The line `const currentStore = formattedItems.find((item) => item.value === params.storeId);` is
    finding the store object in the `formattedItems` array that has a `value` property equal to the
    `storeId` parameter from the current route. It assigns the found store object to the
    `currentStore` variable. */
    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    /* The line `const [open, setOpen] = useState(false);` is using the `useState` hook from React to
    create a state variable called `open` and a corresponding setter function called `setOpen`. The
    initial value of the `open` state variable is `false`. */
    const [open, setOpen] = useState(false);

    /**
     * The function `onStoreSelect` sets the `open` state to `false` and navigates to a new route using
     * the `router.push` method.
     * @param store - The `store` parameter is an object with two properties: `value` and `label`. The
     * `value` property represents the value of the selected store, and the `label` property represents
     * the label or display name of the selected store.
     */
    const onStoreSelect = (store: { value: string, label: string}) => {
        setOpen(false);

        router.push(`/${store.value}`);
    }

    return (
        <Popover
            open = {open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select Store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Store..." />
                        <CommandEmpty>
                            Not store found.
                        </CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.label}
                                    <Check 
                                        className={cn(
                                                "ml-auto h-4 w-4",
                                                currentStore?.value === store.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                            )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5 cursor-pointer" />
                                Create store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};