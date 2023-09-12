
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

/**
 * This function handles a POST request to create a new store, validating the user's authentication and
 * the presence of a name in the request body, and then creating the store in the database.
 * @param {Request} req - The `req` parameter is of type `Request`, which represents an incoming HTTP
 * request. It contains information about the request such as the HTTP method, headers, and body.
 * @returns The code is returning a NextResponse object. If the user is not authorized, it returns a
 * response with "Unauthorized" message and status code 401. If the name is not provided in the request
 * body, it returns a response with "Name is required" message and status code 400. If the store
 * creation is successful, it returns a JSON response with the created store data. If there is
 */
export async function POST(
    req:Request,
) {
    /* The code block you provided is handling a POST request to create a new store. Here's a breakdown
    of what it does: */
    try {
        const { userId } = auth();
        const body = await req.json();
        
        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400 });
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        });

        return NextResponse.json(store);
        
    } catch (error) {
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal error", {status: 500});
        
    }
}