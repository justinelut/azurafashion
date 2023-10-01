import { pb } from "@/app/pocketbase";
import Product from "@/app/products/product";

export const revalidate = 0

export default async function page({params}){
    const products = await pb.collection('fashion_products').getFullList()
    const product = await pb.collection('fashion_products').getOne(params?.id);
    const updatesViewCount = product.views + 1
    await pb.collection('fashion_products').update(params?.id, { views: updatesViewCount });
    return(
        <Product product={product} products={products}/>
    )
}