export default function AuthLayout ({
    children
}: 
    {
        children: React.ReactNode
    }
) {
    return (
        <div
            className="
                    flex
                    items-center
                    justify-center
                    h-full w-full
                    bg-gray-100
                    dark:bg-gray-900
                    p-4
                    sm:p-6
                    md:p-8
                    lg:p-10
                    xl:p-12
                "
            >
            {children}
        </div>
    )
}