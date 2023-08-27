"use client";

import { Copy, Server } from "lucide-react";

import { 
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

/* The `interface ApiAlertProps` defines the props that can be passed to the `ApiAlert` component. It
specifies that the component expects three props: `title`, `description`, and `variant`. */
interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
};

/* The `const textMap` is a mapping object that maps the `variant` prop values of the `ApiAlert`
component to corresponding strings. */
const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"

};

/* The `const variantMap` is a mapping object that maps the `variant` prop values of the `ApiAlert`
component to corresponding values of the `variant` prop of the `Badge` component. */
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
};

/**
 * The `ApiAlert` component is a TypeScript React component that displays an alert with a title and
 * description, and allows the user to copy the description to the clipboard.
 */
export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public"
}) => {
    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to the clipboard");
    };
    
    /* The `return` statement in the code is returning JSX (JavaScript XML) code that represents the
    structure and content of the `ApiAlert` component. */
    return (
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button 
                    variant="outline"
                    size="icon"
                    onClick={onCopy}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}
