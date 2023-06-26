import { pb } from "@/app/pocketbase";
import ProductCategory from "@/app/product-category/category";

export const revalidate = 0

export default async function page({ params, searchParams }) {
    console.log(params.category)
    const products = await pb.collection('fashion_products').getList(1, 10, {
         filter: `category = "${params.category}"`,
         sort: searchParams && searchParams.orderby ? searchParams.orderby : '-created',
    });

    return (
        <ProductCategory
            category={params.category}
            orderby={searchParams && searchParams.orderby ? searchParams.orderby : '-created'}
            products={products.items}
            totalPages={products.totalPages}
            page={products.page}
        />
    )
}