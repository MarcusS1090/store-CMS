"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "@/components/ui/api-alert";

/* The `interface ApiListProps` defines the props that can be passed to the `ApiList` component. It
specifies that the component expects two props: `entityName` and `entityIdName`, both of which
should be of type `string`. These props are used within the component to generate API endpoints. */
interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

/**
 * The `ApiList` component renders a list of API endpoints for different HTTP methods (GET, POST,
 * PATCH, DELETE) with their corresponding URLs.
 * @param  - - `entityName`: The name of the entity for which the API endpoints are being displayed.
 * @returns The `ApiList` component is returning a list of `ApiAlert` components.
 */
export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName
}) => {
    /* The line `const params = useParams();` is using the `useParams` hook from the `next/navigation`
    package to get the parameters from the current URL. These parameters can be used to generate
    dynamic API endpoints by including them in the URL paths. */
    const params = useParams();

    /* The line `const origin = useOrigin();` is calling the `useOrigin` hook to get the origin of the
    current website. The origin is the combination of the protocol (http or https), domain, and port
    number. It is used to construct the base URL for the API endpoints. */
    const origin = useOrigin();

    /* The line `const baseUrl = `/api/${params.storeId}`;` is constructing the base URL for
    the API endpoints. */
    const baseUrl = `${origin}/api/${params.storeId}`;

    /* The `return` statement in the `ApiList` component is rendering a list of `ApiAlert` components.
    Each `ApiAlert` component represents an API endpoint for a specific HTTP method (GET, POST,
    PATCH, DELETE) with its corresponding URL. */
    return (
        <>
            <ApiAlert
                title="GET"
                variant="public"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title="GET"
                variant="public"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="POST"
                variant="admin"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title="PATCH"
                variant="admin"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title="DELETE"
                variant="admin"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
        </>
    );
}
