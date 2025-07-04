import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.NODE_ENV === "production"
        ? "https://tu-dominio.com"
        : "http://localhost:3001",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, {headers: corsHeaders});
};

export async function POST(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
        const { productIds } = await req.json();

        if (!productIds || productIds.length === 0) {
            return new NextResponse("Product ids are required", { status: 400 });
        }

        if (!Array.isArray(productIds) || productIds.some(id => typeof id !== "string")) {
            return new NextResponse("Invalid product IDs format", { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        if (products.length === 0) {
            return new NextResponse("No products found", { status: 404 });
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        products.forEach((product) => {
            line_items.push({
                quantity: 1,
                price_data: {
                    currency: "COP",
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price.toNumber() * 100,
                },
            });
        });

        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: false,
                orderItems: {
                    create: productIds.map((productId: string) => ({
                        product: {
                            connect: {
                                id: productId,
                            },
                        },
                    })),
                },
            },
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
            cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
            metadata: {
                orderId: order.id,
            },
        });

        return NextResponse.json({ url: session.url }, {
            headers: corsHeaders,
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}