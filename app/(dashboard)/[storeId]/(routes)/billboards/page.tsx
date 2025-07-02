import prismadb from "@/lib/prismadb";

import {format} from "date-fns";

import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";

/**
 * The BillboardsPage component renders a div with a child component called BillboardClient.
 * @returns The BillboardsPage component is returning a div element with the class name "fex-col".
 * Inside the div, there is another div element with the class name "flex-1 space-y-4 p-8 pt-6". Inside
 * this div, the BillboardClient component is being rendered.
 */
const BillboardsPage = async (
    props: {
        params : Promise<{storeId: string}>
    }
) => {
    const params = await props.params;
    /* The code is using the `prismadb` library to query the database for billboards. It is calling the
    `findMany` method on the `billboard` object, which retrieves multiple billboard records from the
    database. The `where` clause specifies that the billboards should have a `storeId` matching the
    `params.storeId` value. The `orderBy` clause specifies that the results should be ordered by the
    `createdAt` field in descending order. The retrieved billboards are then stored in the
    `billboards` variable. */
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, 'yyyy-MM-dd'),
    }));

    return (
        <div className="fex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data= {formattedBillboards} />
            </div>
        </div>
    )
}

export default BillboardsPage