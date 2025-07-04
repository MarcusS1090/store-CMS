import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import {format} from "date-fns";

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";


const ProductsPage = async (
    props: {
        params : Promise<{storeId: string}>
    }
) => {
    const params = await props.params;

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        supplier: item.supplier,
        quantity: item.quantity,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, 'yyyy-MM-dd'),
    }));

    return (
        <div className="fex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data= {formattedProducts} />
            </div>
        </div>
    )
}

export default ProductsPage