import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(

    req:Request,
    { params}: { params : {storeId: string}},
) {

    try {

        const {userId} = await auth();

        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store is required", { status: 400 });
        }

        const Store = await prismadb.store.update({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        return NextResponse.json(Store);

    } 
    catch (error) {
        //console.log('[STORE_PATCH]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req:Request,
    { params}: { params : {storeId: string}},
) {
    try {

        const {userId} = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store is required", { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId
            }
        });

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        });

        if (products.length > 0 || categories.length > 0) {
            return new NextResponse("Asegúrese de eliminar todos los productos y categorías antes de eliminar la tienda.",
                { status: 400 }
            );
            
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        });

        return NextResponse.json(store);


    } catch (error) {
        //console.log('[STORE_DELETE]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};