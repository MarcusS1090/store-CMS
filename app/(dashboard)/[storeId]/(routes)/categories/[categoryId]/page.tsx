import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

/* The code is defining an asynchronous function called `BillboardPage` that takes in an object with a
`params` property. The `params` property is expected to have a `billboardId` property of type
string. */
const CategoryPage = async({
    params
}: {
    params: { categoryId: string, storeId: string }
}) => {
    /* The code is using the `prismadb` library to query the database for a unique billboard record. It
    is using the `findUnique` method of the `billboard` object and passing in a `where` object with
    the condition that the `id` property matches the `billboardId` value from the `params` object.
    The result of the query is stored in the `billboard` variable. */
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    });

    /* The code is using the `prismadb` library to query the database for multiple billboard records.
    It is using the `findMany` method of the `billboard` object and passing in a `where` object with
    the condition that the `storeId` property matches the `storeId` value from the `params` object.
    The result of the query is stored in the `billboards` variable. */
    const billboards = await prismadb.billboard.findMany({
        where:{
            storeId: params.storeId
        }
    });

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm
                    billboards={billboards}
                    initialData={category}
                />
            </div>
        </div>
    );
}

export default CategoryPage;