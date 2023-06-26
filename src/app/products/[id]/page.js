import { pb } from "@/app/pocketbase";
import Product from "@/app/products/product";

export const revalidate = 0

export default async function page({params}){
    const products = await pb.collection('fashion_products').getFullList()
    const product = await pb.collection('fashion_products').getOne(params.id);
    return(
        <Product product={product} products={products}/>
    )
}