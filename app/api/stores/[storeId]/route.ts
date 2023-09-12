import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

/**
 * This TypeScript function is used to handle a PATCH request to update a store's name in a database.
 * @param {Request} req - The `req` parameter is the incoming HTTP request object. It contains
 * information about the request such as headers, body, and URL.
 * @param  - - `req`: The request object containing information about the HTTP request.
 * @returns a NextResponse object.
 */
export async function PATCH(
    /* The code `req:Request, { params}: { params : {storeId: string}},` is defining the function
    parameters for the `PATCH` and `DELETE` functions. */
    req:Request,
    { params}: { params : {storeId: string}},
) {
    /* The code block you provided is a `try` block that is used to handle a PATCH request to update a
    store's name in a database. Here is a breakdown of what the code is doing: */
    try {
        /* The line `const {userId} = auth();` is using destructuring assignment to extract the
        `userId` property from the result of the `auth()` function. */
        const {userId} = auth();

        /* The line `const body = await req.json();` is used to parse the JSON data from the request
        body. */
        const body = await req.json();

        /* The line `const { name } = body;` is using destructuring assignment to extract the `name`
        property from the `body` object. */
        const { name } = body;

        /* The code `if (!userId) { return new NextResponse("Unauthenticated", { status: 401 }); }` is
        checking if the `userId` variable is falsy (null, undefined, false, 0, etc.). If the
        `userId` is falsy, it means that the user is not authenticated. In this case, the code
        returns a `NextResponse` object with a status code of 401 (Unauthorized) and a message of
        "Unauthenticated". */
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        /* The code `if (!name) { return new NextResponse("Name is required", { status: 400 }); }` is
        checking if the `name` variable is falsy (null, undefined, false, 0, etc.). If the `name` is
        falsy, it means that the request is missing the required parameter for the store name. In
        this case, the code returns a `NextResponse` object with a status code of 400 (Bad Request)
        and a message of "Name is required". This is used to handle cases where the name parameter
        is not provided in the request, indicating that the request is invalid or incomplete. */
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        /* The code `if (!params.storeId) { return new NextResponse("Store is required", { status: 400
        }); }` is checking if the `storeId` parameter is missing or falsy (null, undefined, false,
        0, etc.). */
        if (!params.storeId) {
            return new NextResponse("Store is required", { status: 400 });
        }

        /* The code `const store = await prismadb.store.updateMany({ ... })` is updating a store's name
        in the database using the `prismadb` library. */
        const Store = await prismadb.store.update({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        /* `return NextResponse.json(store);` is returning a JSON response with the `store` object as
        the response body. */
        return NextResponse.json(Store);

    } /* The `catch` block is used to handle any errors that occur within the `try` block. If an error
    occurs, it will be caught and the code within the `catch` block will be executed. */
    catch (error) {
        console.log('[STORE_PATCH]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

/**
 * This TypeScript function deletes a store from the database based on the store ID and the
 * authenticated user ID.
 * @param {Request} req - The `req` parameter is of type `Request` and represents the incoming HTTP
 * request.
 * @param  - - `req`: The request object containing information about the HTTP request.
 * @returns a NextResponse object. If the user is not authenticated, it returns a response with status
 * code 401 and message "Unauthenticated". If the storeId parameter is missing, it returns a response
 * with status code 400 and message "Store is required". If the deletion is successful, it returns a
 * JSON response with the deleted store. If there is an error, it returns a
 */
export async function DELETE (
    req:Request,
    { params}: { params : {storeId: string}},
) {
    try {
        /* The line `const {userId} = auth();` is using destructuring assignment to extract the
        `userId` property from the result of the `auth()` function. */
        const {userId} = auth();

        /* The code `if (!userId) { return new NextResponse("Unauthenticated", { status: 401 }); }` is
        checking if the `userId` variable is falsy (null, undefined, false, 0, etc.). If the
        `userId` is falsy, it means that the user is not authenticated. In this case, the code
        returns a `NextResponse` object with a status code of 401 (Unauthorized) and a message of
        "Unauthenticated". This is used to handle cases where the user is not logged in or does not
        have the necessary authentication to perform the requested action. */
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        /* The code `if (!params.storeId) { return new NextResponse("Store is required", { status: 400
        }); }` is checking if the `storeId` parameter is missing or falsy (null, undefined, false,
        0, etc.). If the `storeId` is missing or falsy, it means that the request is missing the
        required parameter for the store ID. In this case, the code returns a `NextResponse` object
        with a status code of 400 (Bad Request) and a message of "Store is required". This is used
        to handle cases where the store ID is not provided in the request, indicating that the
        request is invalid or incomplete. */
        if (!params.storeId) {
            return new NextResponse("Store is required", { status: 400 });
        }

        /* The code `const store = await prismadb.store.deleteMany({ where: { id: params.storeId,
        userId } });` is deleting a store from the database. */
        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        });

        /* `return NextResponse.json(store);` is returning a JSON response with the `store` object as
        the response body. */
        return NextResponse.json(store);

    /* The `catch` block is used to handle any errors that occur within the `try` block. In this case,
    if an error occurs, it will be caught and the code within the `catch` block will be executed. */
    } catch (error) {
        console.log('[STORE_DELETE]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};