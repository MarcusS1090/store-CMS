import prismadb from "@/lib/prismadb";

import {format} from "date-fns";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";


const OrdersPage = async (
    props: {
        params : Promise<{storeId: string}>
    }
) => {
    const params = await props.params;

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(", "),
        /* The line `totalPrice: formatter.format(item.orderItems.reduce((total,item) => { return total
        + Number(item.product.price) }, 0)),` is calculating the total price of all the products in
        an order and formatting it using the `formatter` function. */
        totalPrice: formatter.format(item.orderItems.reduce((total,item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, 'yyyy-MM-dd'),
    }));

    return (
        <div className="fex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data= {formattedOrders} />
            </div>
        </div>
    )
}

export default OrdersPage