"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import {
    Category,
    Color,
    Image,
    Product,
    Size
} from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"


const formSchema = z.object({
    name: z.string().min(1),
    supplier: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    quantity: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    initialData: Product & {
        images: Image[]
    } | null;
    categories: Category[];
    colors: Color[];
    sizes: Size[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    colors,
    sizes,
}) => {

    const params = useParams();

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const title = initialData ? "Editar Producto" : "Crear producto";
    const description = initialData ? "Editar Producto" : "Añadir un nuevo producto";
    const toastMessage = initialData ? "Producto actualizado" : "Producto creado.";
    const action = initialData ? "Guardar cambios" : "Creado";


    const defaultValues = initialData ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
    } : {
        name: '',
        supplier: '',
        quantity:0,
        images: [],
        price:0,
        categoryId: '',
        colorId: '',
        sizeId: '',
        isFeatured: false,
        isArchived: false,
    }
    
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });


    const onSubmit = async (data: ProductFormValues) => {
    try {
        setLoading(true);


        if (initialData) {
            await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
        } else {
            await axios.post(`/api/${params.storeId}/products`, data);
        }

        router.refresh();

        router.push(`/${params.storeId}/products`);

        toast.success(toastMessage);
        
    } 

    catch (error: any) {

        toast.error('Algo salió mal.');

    } finally {

        setLoading(false);
    }
    };

    const onDelete = async () => {
    try {

        setLoading(true);


        await axios.delete(`/api/${params.storeId}/products/${params.productId}`);

        router.refresh();

        router.push(`/${params.storeId}/products`);

        toast.success('Producto eliminado.');

    } 

    catch (error: any) {

        toast.error('Algo salió mal.');

    } finally {

        setLoading(false);

        setOpen(false);
    }
    }

    return (
    <>
    <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
    />
        <div className="flex items-center justify-between">
        <Heading 
            title={title}
            description={description} 
        />
        {initialData && (
        <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
        >
            <Trash className="h-4 w-4" />
        </Button>
        )}
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Imagenes</FormLabel>
                        <FormControl>
                        <ImageUpload 
                            value={field.value.map((image) =>image.url)}
                            disabled={loading}
                            onChange={(url) => field.onChange([...field.value, { url }])}
                            onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}

                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="md:grid md:grid-cols-3 gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                        <Input disabled={loading} placeholder="Nombre del producto" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Proovedor</FormLabel>
                        <FormControl>
                        <Input  disabled={loading} placeholder="Proovedor del producto" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                        <Input type="number" disabled={loading} placeholder="$1000" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cantidad</FormLabel>
                        <FormControl>
                        <Input type="number" disabled={loading} placeholder="Cuantos productos" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Selecciona una categoria"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sizeId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tamaño</FormLabel>
                        <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Selecciona un tamaño"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {sizes.map((size) => (
                                    <SelectItem
                                        key={size.id}
                                        value={size.id}
                                    >
                                        {size.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="colorId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Select a size"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {colors.map((color) => (
                                    <SelectItem
                                        key={color.id}
                                        value={color.id}
                                    >
                                        {color.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                    <FormItem 
                        className="
                            flex
                            flex-row
                            items-start
                            space-x-3
                            space-y-0
                            rounded-md
                            border
                            p-4
                        ">
                        <FormControl>
                            <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                Destacado
                            </FormLabel>
                            <FormDescription>
                                Este producto se mostrará en la página de inicio
                            </FormDescription>
                        </div>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isArchived"
                    render={({ field }) => (
                    <FormItem 
                        className="
                            flex
                            flex-row
                            items-start
                            space-x-3
                            space-y-0
                            rounded-md
                            border
                            p-4
                        ">
                        <FormControl>
                            <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                Archivado
                            </FormLabel>
                            <FormDescription>
                                Este producto no se mostrará en la tienda
                            </FormDescription>
                        </div>
                    </FormItem>
                    )}
                />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                {action}
                </Button>
            </form>
        </Form>
    </>
    );
};