"use client";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

/* The code is exporting a function called `MainNav` that takes in an object as its parameter. The
object can have a property called `className` of type `string`, and any other properties of type
`React.HTMLAttributes<HTMLElement>`. The function returns a JSX element, specifically a `<div>`
element with the text "main-nav" inside. */
export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    /* `const pathname = usePathname();` is using the `usePathname` hook from the `next/navigation`
    library to get the current pathname of the URL. The `usePathname` hook returns the current
    pathname as a string. */
    const pathname = usePathname();

    /* `const params = useParams();` is using the `useParams` hook from the `next/navigation` library
    to get the dynamic parameters from the URL. */
    const params = useParams();

    /* The `const routes` variable is an array of objects that represent the navigation routes for the
    `MainNav` component. Each object in the array represents a single route and has three
    properties: */
    const routes = [
        {
            href:`/${params.storeId}`,
            label: "Inicio",
            active: pathname === `/${params.storeId}`,
        },
        {
            href:`/${params.storeId}/settings`,
            label: "Configuración",
            active: pathname === `/${params.storeId}/settings`,
        },
        {
            href:`/${params.storeId}/billboards`,
            label: "Banners",
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href:`/${params.storeId}/categories`,
            label: "Categorías",
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href:`/${params.storeId}/sizes`,
            label: "Tamaños",
            active: pathname === `/${params.storeId}/sizes`,
        },
        {
            href:`/${params.storeId}/colors`,
            label: "Colores",
            active: pathname === `/${params.storeId}/colors`,
        },
        {
            href:`/${params.storeId}/products`,
            label: "Productos",
            active: pathname === `/${params.storeId}/products`,
        },
        {
            href:`/${params.storeId}/orders`,
            label: "Ordenes",
            active: pathname === `/${params.storeId}/orders`,
        },
    ];

    return (
        /* The `<nav>` element is a semantic HTML element that represents a section of a page that
        contains navigation links. In this case, it is used to create the main navigation component. */
        
        /*
            The code is using the `routes` array to dynamically generate a list of navigation links
            using the `map` function.
        */
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}
