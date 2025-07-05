
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


/**
 * This TypeScript function handles a POST request to create a new billboard, performing authentication
 * and validation checks before creating the billboard in the database.
 * @param {Request} req - The `req` parameter is the incoming request object, which contains
 * information about the HTTP request being made.
 * @param  - - `req`: The request object containing information about the HTTP request.
 * @returns a NextResponse object. The specific response depends on the conditions met in the code. If
 * the user is unauthenticated, it returns a response with "Unauthenticated" message and status code
 * 401. If the label is missing, it returns a response with "Label is required" message and status code
 * 400. If the image URL is missing, it returns a response with "
 */
export async function POST(
    /* `req: Request` is defining the `req` parameter as an object of type `Request`. This is the
    incoming request object, which contains information about the HTTP request being made. */
    req:Request,
    props: { params: Promise<{ storeId: string}> }
) {
    const params = await props.params;
    /* The code block you provided is a `try` block that handles the logic for creating a new billboard
    in the database. Here's a breakdown of what it does: */
    try {
        /* The line `const { userId } = auth();` is using destructuring assignment to extract the
       `userId` property from the result of the `auth()` function. */
        const { userId } = await auth();

        /* The line `const body = await req.json();` is parsing the JSON data from the request body. It
        is using the `json()` method of the `req` object to asynchronously read the request body
        stream and parse it as JSON. The parsed JSON data is then stored in the `body` variable. */
        const body = await req.json();
        
        /* The line `const { label, imageUrl } = body;` is using destructuring assignment to extract
        the `label` and `imageUrl` properties from the `body` object. */
        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is required", {status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image is required", {status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400 });
        }

        /* The code `const storeByUserId = await prismadb.store.findFirst({ where: { id:
        params.storeId, userId } });` is querying the database to find the store that matches the
        given `storeId` and `userId`. */
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        /* The code `const billboard = await prismadb.billboard.create({ data: { label, imageUrl,
        storeId: params.storeId } });` is creating a new billboard in the database using the
        `prismadb` library. */
        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        /* The line `return NextResponse.json(billboard);` is returning a JSON response with the
        `billboard` object as the response body. */
        return NextResponse.json(billboard);
        
    } catch (error) {
        console.log('[BILLBOARDS_POST]',error);
        return new NextResponse("Internal error", {status: 500});
        
    }
}

/**
 * This TypeScript function retrieves billboards from a database based on a store ID and returns them
 * as a JSON response.
 * @param {Request} req - The `req` parameter is the incoming HTTP request object. It contains
 * information about the request such as headers, query parameters, and body.
 * @param  - - `req`: The request object containing information about the incoming HTTP request.
 * @returns a JSON response containing the billboards that match the specified storeId.
 */
export async function GET(
    /* In the code provided, `req: Request` is defining the `req` parameter as an object of type
    `Request`. This is the incoming request object, which contains information about the HTTP request
    being made. */
    req:Request,
    props: { params: Promise<{ storeId: string}> }
) {
    const params = await props.params;
    /* The code block you provided is a `try` block that handles the logic for retrieving billboards
    from a database based on a store ID and returning them as a JSON response. */
    try {

        /* The code `const billboards = await prismadb.billboard.findMany({ where: { storeId:
        params.storeId } });` is querying the database to find all billboards that have a `storeId`
        matching the value of `params.storeId`. */
        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        });

        /* `return NextResponse.json(billboards);` is returning a JSON response with the `billboards`
        object as the response body. */
        return NextResponse.json(billboards);
        
    }
    /* The `catch` block in the code is used to handle any errors that occur during the execution of
    the `try` block. */
    catch (error) {
        console.log('[BILLBOARDS_GET]',error);
        return new NextResponse("Internal error", {status: 500});
        
    }
}