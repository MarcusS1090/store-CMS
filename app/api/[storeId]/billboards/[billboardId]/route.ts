import { auth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

/**
 * This TypeScript function is an async GET request handler that retrieves a billboard object based on
 * the provided billboardId parameter.
 * @param {Request} req - The `req` parameter is the incoming request object that contains information
 * about the HTTP request being made.
 * @param  - - `req`: The request object containing information about the incoming request.
 * @returns The code is returning a JSON response containing the billboard object.
 */
export async function GET(
    /* The `req:Request` parameter is defining the type of the `req` object, which is the incoming
    request object that contains information about the HTTP request being made. It specifies that
    `req` should be of type `Request`. */
    req:Request,
    props: { params : Promise<{billboardId: string}>}
) {
    const params = await props.params;
    /* The code block you provided is a try-catch statement that handles the logic for retrieving a
    billboard object based on the provided billboardId parameter. */
    try {

        if (!params.billboardId) {
            return new NextResponse("billboardId is required", { status: 400 });
        }


        /* The code `const billboard = await prismadb.billboard.findUnique({ where: { id:
        params.billboardId } });` is retrieving a billboard object from the database based on the
        provided `billboardId` parameter. */
        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        });

        /* `return NextResponse.json(billboard);` is returning a JSON response containing the
        `billboard` object. */
        return NextResponse.json(billboard);

    }
    /* The `catch` block is used to handle any errors that occur within the `try` block. In this
    specific code snippet, if an error occurs during the execution of the `GET` function, the
    error message is logged to the console using `console.log('[BILLBOARD_GET]', error)`. */
    catch (error) {
        console.log('[BILLBOARD_GET]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

/**
 * The above TypeScript function is an async PATCH request handler that updates a billboard's label and
 * image URL in a store, based on the provided store ID, billboard ID, and request body.
 * @param {Request} req - The `req` parameter is the incoming request object that contains information
 * about the HTTP request being made.
 * @param  - - `req`: The request object containing information about the HTTP request.
 * @returns a NextResponse object. The specific response depends on the conditions and data provided in
 * the code. It could return a response with a status code and message, or it could return a JSON
 * response with the updated billboard data.
 */
export async function PATCH(
    /* The code `req:Request, { params}: { params : {storeId: string, billboardId: string}}` is
    defining the parameters for the function. */
    req:Request,
    props: { params : Promise<{storeId: string, billboardId: string}>}
) {
    const params = await props.params;
    /* The code block you provided is a `try` block that handles the logic for updating a billboard's
    label and image URL in a store. Here's a breakdown of what the code is doing: */
    try {
        /* The line `const {userId} = auth();` is using destructuring assignment to extract the
        `userId` property from the result of the `auth()` function. */
        const {userId} = await auth();

        /* The line `const body = await req.json();` is parsing the JSON data from the request body. */
        const body = await req.json();

        /* The line `const { label, imageUrl } = body;` is using destructuring assignment to extract
        the `label` and `imageUrl` properties from the `body` object. */
        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image  URL is required", { status: 400 });
        }

        if (!params.billboardId) {
            return new NextResponse("billboard id is required", { status: 400 });
        }

        /* The code `const storeByUserId = await prismadb.store.findFirst({ where: { id:
        params.storeId, userId } });` is querying the database to find a store that matches the
        provided `storeId` and `userId` parameters. */
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const existingBillboard = await prismadb.billboard.findUnique({
            where: { id: params.billboardId },
        });

        if (existingBillboard && existingBillboard.imageUrl && existingBillboard.imageUrl !== imageUrl) {
            const publicId = existingBillboard.imageUrl.split('/').pop()?.split('.')[0];
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        const billboard = await prismadb.billboard.update({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        });

        /* `return NextResponse.json(billboard);` is returning a JSON response containing the
        `billboard` object. The `NextResponse.json()` method is used to create a JSON response with
        the provided data. In this case, the `billboard` object is passed as the data parameter, and
        it will be serialized into JSON format and included in the response body. */
        return NextResponse.json(billboard);

    }
    /* The `catch` block is used to handle any errors that occur within the `try` block of the `PATCH`
    function. */
    catch (error) {
        console.log('[BILLBOARD_PATCH]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

/**
 * This TypeScript function deletes a billboard based on the provided billboardId and storeId, after
 * performing authentication and authorization checks.
 * @param {Request} req - The `req` parameter is of type `Request` and represents the incoming HTTP
 * request.
 * @param  - - `req`: The request object containing information about the HTTP request.
 * @returns a NextResponse object. The specific response depends on the conditions and logic within the
 * function. It could return a response with a status code and message, or it could return a JSON
 * object containing the deleted billboard data.
 */
export async function DELETE(
    /* The code `req:Request, { params}: { params : {billboardId: string, storeId: string}}` is
    defining the parameters for the function. */
    req:Request,
    props: { params : Promise<{billboardId: string, storeId: string}>}
) {
    const params = await props.params;
    /* The code block you provided is a `try` block that handles the logic for deleting a billboard.
    Here's a breakdown of what the code is doing: */
    try {
        /* The line `const {userId} = auth();` is using destructuring assignment to extract the
        `userId` property from the result of the `auth()` function. */
        const {userId} = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.billboardId) {
            return new NextResponse("billboardId is required", { status: 400 });
        }

        /* The code `const storeByUserId = await prismadb.store.findFirst({ where: { id:
        params.storeId, userId } });` is querying the database to find a store that matches the
        provided `storeId` and `userId` parameters. */
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const existingBillboard = await prismadb.billboard.findUnique({
            where: { id: params.billboardId },
        });

        if (existingBillboard && existingBillboard.imageUrl) {
            const publicId = existingBillboard.imageUrl.split('/').pop()?.split('.')[0];
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        const billboard = await prismadb.billboard.delete({
            where: {
                id: params.billboardId,
            }
        });

        /* `return NextResponse.json(billboard);` is creating a JSON response with the `billboard`
        object as the data and returning it. The `NextResponse.json()` method is used to create a
        JSON response with the provided data. In this case, the `billboard` object is passed as the
        data parameter, and it will be serialized into JSON format and included in the response
        body. */
        return NextResponse.json(billboard);

    } 
    /* The `catch` block is used to handle any errors that occur within the `try` block of the
    `DELETE` function. */
    catch (error) {
        console.log('[BILLBOARD_DELETE]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};