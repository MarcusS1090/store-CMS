import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function GET (
    req:Request,
    { params}: { params : {categoryId: string}}
) {

    try {

        if (!params.categoryId) {
            return new NextResponse("Category Id is required", { status: 400 });
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);

    }
    catch (error) {
        console.log('[CATEGORY_GET]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function PATCH(
    /* The code `req:Request, { params}: { params : {storeId: string, billboardId: string}}` is
    defining the parameters for the function. */
    req:Request,
    { params}: { params : {storeId: string, categoryId: string}}
) {
    /* The code block you provided is a `try` block that handles the logic for updating a billboard's
    label and image URL in a store. Here's a breakdown of what the code is doing: */
    try {
        /* The line `const {userId} = auth();` is using destructuring assignment to extract the
        `userId` property from the result of the `auth()` function. */
        const {userId} = auth();

        /* The line `const body = await req.json();` is parsing the JSON data from the request body. */
        const body = await req.json();

        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("billboard Id  URL is required", { status: 400 });
        }

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
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

        /* The code `const billboard = await prismadb.billboard.update({ ... })` is updating a
        billboard object in the database. */
        const category = await prismadb.category.update({
            where: {
                id: params.categoryId,
                
            },
            data: {
                name,
                billboardId
            }
        });

        /* `return NextResponse.json(billboard);` is returning a JSON response containing the
        `billboard` object. The `NextResponse.json()` method is used to create a JSON response with
        the provided data. In this case, the `billboard` object is passed as the data parameter, and
        it will be serialized into JSON format and included in the response body. */
        return NextResponse.json(category);

    }
    /* The `catch` block is used to handle any errors that occur within the `try` block of the `PATCH`
    function. */
    catch (error) {
        console.log('[CATEGORY_PATCH]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function DELETE (
    req:Request,
    { params}: { params : {categoryId: string, storeId: string}},
) {

    try {

        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.categoryId) {
            return new NextResponse("category Id is required", { status: 400 });
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);

    } 
    /* The `catch` block is used to handle any errors that occur within the `try` block of the
    `DELETE` function. */
    catch (error) {
        console.log('[CATEGORY_DELETE]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};