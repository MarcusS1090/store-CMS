import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
export async function POST(req:Request, props: { params : Promise<{productId: string}>}) {
    const params = await props.params;
    try {
        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color:true,
            }
        });

        if (!product) {
            return new NextResponse("Product not found", {status:400});
        }

        await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                quantity: product.quantity-1,
            },
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log('[PRODUCT_GET]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
export async function GET(req:Request, props: { params : Promise<{productId: string}>}) {
    const params = await props.params;

    try {

        if (!params.productId) {
            return new NextResponse("product id is required", { status: 400 });
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color:true,
            }
        });

        return NextResponse.json(product);

    }

    catch (error) {
        console.log('[PRODUCT_GET]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req:Request,
    props: { params : Promise<{storeId: string, productId: string}>}
) {
    const params = await props.params;

    try {

        const {userId} = await auth();

        const body = await req.json();

        const {
            name,
            supplier,
            quantity,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!price) {
            return new NextResponse("Price is required", {status: 400 });
        }

        if (!quantity) {
            return new NextResponse("Quantity is required", {status: 400 });
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", {status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Images is required", {status: 400 });
        }


        if (!sizeId) {
            return new NextResponse("Size id is required", {status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Color id is required", {status: 400 });
        }

        if (!params.productId) {
            return new NextResponse("product id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        await prismadb.product.update({
            where: {
                id: params.productId,
                
            },
            data: {
                name,
                supplier,
                quantity,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    deleteMany: {
                        
                    },
                },
            }
        });

        const product = await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url: string}) =>image),
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product);

    }

    catch (error) {
        console.log('[PRODUCT_PATCH]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    req:Request,
    props: { params : Promise<{productId: string, storeId: string}>}
) {
    const params = await props.params;

    try {

        const {userId} = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,
            }
        });

        return NextResponse.json(product);

    } 

    catch (error) {
        console.log('[PRODUCT_DELETE]',error);
        return new NextResponse("Internal error", { status: 500 });
    }
};