import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboards-form";

/* The code is defining an asynchronous function called `BillboardPage` that takes in an object with a
`params` property. The `params` property is expected to have a `billboardId` property of type
string. */
const BillboardPage = async (
    props: {
        params: Promise<{ billboardId: string }>
    }
) => {
    const params = await props.params;
    /* The code is using the `prismadb` library to query the database for a unique billboard record. It
    is using the `findUnique` method of the `billboard` object and passing in a `where` object with
    the condition that the `id` property matches the `billboardId` value from the `params` object.
    The result of the query is stored in the `billboard` variable. */
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    });


    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm 
                    initialData={billboard}
                />
            </div>
        </div>
    );
}

export default BillboardPage;