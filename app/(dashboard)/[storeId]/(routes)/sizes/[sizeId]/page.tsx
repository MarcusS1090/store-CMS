import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";


const SizePage = async (
    props: {
        params: Promise<{ sizeId: string }>
    }
) => {
    const params = await props.params;

    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    });


    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm 
                    initialData={size}
                />
            </div>
        </div>
    );
}

export default SizePage;