"use client"
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import Card from '@/components/Card/Card';
import DownArrow from '/public/icons/DownArrow';
import { imageurl } from '@/components/Util/getimage';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { pb } from "@/app/pocketbase";

const ProductCategory = ({ products, category, orderby, totalPages, page }) => {
    const [items, setItems] = useState(products)
    const [totalNumberPages, setTotalPages] = useState(totalPages)
    const [pageNumber, setPageNumber] = useState(page)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        setItems(products);
    }, [products]);

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });

    useEffect(() => {
        // Flag to prevent multiple fetch requests
        const fetchData = async () => {
            if (inView && totalNumberPages > pageNumber && !isFetching && pageNumber <= totalNumberPages) {
                setIsFetching(true); // Set the flag to indicate that a fetch request is in progress

                const fetchedProducts = await pb.collection('fashion_products').getList(pageNumber + 1, 10, {
                    filter: `category = men`,
                    sort: '-created',
                });
                setItems((prevItems) => [...prevItems, ...fetchedProducts.items]);


                 setIsFetching(false); // Reset the flag after the fetch request is completed
                setPageNumber(fetchedProducts.page)
                setTotalPages(fetchedProducts.totalPages)
            }
        };

        fetchData();
    }, [inView, pageNumber, totalNumberPages]);


    return (
        <main id='main-content'>
            <div className='bg-lightgreen h-16 w-full flex items-center'>
                <div className='app-x-padding app-max-width w-full'>
                    <div className='breadcrumb'>
                        <Link href='/' className='text-gray400'>
                            Home
                        </Link>{' '}
                        / <span className='capitalize'>{category && category}</span>
                    </div>
                </div>
            </div>

            {/* ===== Heading & Filter Section ===== */}
            <div className='app-x-padding app-max-width w-full mt-8'>
                <h3 className='text-4xl mb-2 capitalize'>{category && category}</h3>
                <div className='flex flex-col-reverse sm:flex-row gap-4 sm:gap-0 justify-between mt-4 sm:mt-6'>
                    <span>
                        <div>
                            {/* Other JSX content */}
                            <p>
                                {/* showing_from_to: from {firstIndex} to {numberOfProducts < lastIndex ? numberOfProducts : lastIndex} of {numberOfProducts} */}
                            </p>
                            {/* Other JSX content */}
                        </div>

                    </span>
                    {category !== 'new-arrivals' && <SortMenu orderby={orderby} category={category} />}
                </div>
            </div>

            {/* ===== Main Content Section ===== */}
            <div className='app-x-padding app-max-width mt-3 mb-14'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10'>
                    {items && items.map((product, index) => (
                        items.length === index + 1 ? (
                            <div ref={ref}>
                                <Card
                                    key={product.id}
                                    id={product.id}
                                    price={product.price}
                                    collectionId={product.collectionId}
                                    name={product.name}
                                    featuredimage={imageurl(product.collectionId, product.id, product.featuredimage)}
                                    otherimages={imageurl(product.collectionId, product.id, product.otherimages[0])}
                                    qty={product.qty}
                                />
                            </div>
                        ) : (
                            <Card
                                key={product.id}
                                id={product.id}
                                price={product.price}
                                collectionId={product.collectionId}
                                name={product.name}
                                featuredimage={imageurl(product.collectionId, product.id, product.featuredimage)}
                                otherimages={imageurl(product.collectionId, product.id, product.otherimages[0])}
                                qty={product.qty}
                            />
                        )

                    ))}
                </div>
               {isFetching ? "Loading" : ''}
            </div>
        </main>

    );
};


const SortMenu = ({ orderby, category }) => {
    const router = useRouter()
    let currentOrder;

    if (orderby === '-price') {
        currentOrder = 'sort_by_price';
    } else if (orderby === 'price') {
        currentOrder = 'sort_by_price_desc';
    } else {
        currentOrder = '-created';
    }
    return (
        <Menu
            as='div'
            className='relative'>
            <Menu.Button
                as='a'
                href='#'
                className='flex items-center capitalize'>
                {currentOrder} <DownArrow />
            </Menu.Button>
            <Menu.Items className='flex flex-col z-10 items-start text-xs sm:text-sm w-auto sm:right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none'>
                <Menu.Item>
                    {({ active }) => (
                        <button
                            type='button'
                            onClick={() =>
                                router.push(`/product-category/${category}?orderby=-created`)
                            }
                            className={`${active ? 'bg-gray100 text-gray500' : 'bg-white'
                                } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${currentOrder === 'sort_by_latest' && 'bg-gray500 text-gray100'
                                }`}>
                            Sort by latest
                        </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <button
                            type='button'
                            onClick={() =>
                                router.push(`/product-category/${category}?orderby=-price`)
                            }
                            className={`${active ? 'bg-gray100 text-gray500' : 'bg-white'
                                } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${currentOrder === 'sort_by_price' && 'bg-gray500 text-gray100'
                                }`}>
                            Price high to low
                        </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <button
                            type='button'
                            onClick={() =>
                                router.push(`/product-category/${category}?orderby=price`)
                            }
                            className={`${active ? 'bg-gray100 text-gray500' : 'bg-white'
                                } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${currentOrder === 'sort_by_price_desc' &&
                                'bg-gray500 text-gray100'
                                }`}>
                            Price low to high
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default ProductCategory;
