import { BillboardClient } from "./components/client"

/**
 * The BillboardsPage component renders a div with a child component called BillboardClient.
 * @returns The BillboardsPage component is returning a div element with the class name "fex-col".
 * Inside the div, there is another div element with the class name "flex-1 space-y-4 p-8 pt-6". Inside
 * this div, the BillboardClient component is being rendered.
 */
const BillboardsPage = () => {
    return (
        <div className="fex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient />
            </div>
        </div>
    )
}

export default BillboardsPage