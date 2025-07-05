
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";



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
        
        
        /* The line `const { name, billboardId } = body;` is using destructuring assignment to extract
        the `name` and `billboardId` properties from the `body` object. */
        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("BillboardId is required", {status: 400 });
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

        
        /* The code `const category = await prismadb.category.create({ data: { name, billboardId,
        storeId: params.storeId } });` is creating a new category in the database using the
        `prismadb` library. */
        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        
        /* `return NextResponse.json(category);` is returning a JSON response with the `category`
        object as the response body. */
        return NextResponse.json(category);
        
    } catch (error) {
        console.log('[CATEGORIES_POST]',error);
        return new NextResponse("Internal error", {status: 500});
        
    }
}


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

        
        /* The code `const categories = await prismadb.category.findMany({ where: { storeId:
        params.storeId } });` is querying the database to find all categories that belong to a
        specific store. */
        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        });

        
        /* `return NextResponse.json(categories);` is returning a JSON response with the `categories`
        object as the response body. The `NextResponse.json()` method is used to create a JSON
        response with the specified data. In this case, the `categories` object is serialized as
        JSON and sent as the response body. */
        return NextResponse.json(categories);
        
    }
    /* The `catch` block in the code is used to handle any errors that occur during the execution of
    the `try` block. */
    catch (error) {
        console.log('[CATEGORIES_GET]',error);
        return new NextResponse("Internal error", {status: 500});
        
    }
}