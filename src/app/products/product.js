"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import Heart from '/public/icons/Heart';
import DownArrow from '/public/icons/DownArrow';
import FacebookLogo from '/public/icons/FacebookLogo';
import InstagramLogo from '/public/icons/InstagramLogo';
import GhostButton from '@/components/Buttons/GhostButton';
import Button from '@/components/Buttons/Button';
import Card from '@/components/Card/Card';

// swiperjs
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
import HeartSolid from '/public/icons/HeartSolid';
import { useWishListStore } from '@/context/wishlist/wishlisttore';
import { imageurl } from '@/components/Util/getimage';
import { useCart } from '@/context/cart/cart';

// install Swiper modules
SwiperCore.use([Pagination]);


const Product = ({ product, products }) => {
    const  addToCart = useCart((state) => state.addToCart)
    const setWishList = useWishListStore((state) => state.setWishList)
    const deleteWishlistItem = useWishListStore((state) => state.deleteWishlistItem)
    const wishlist = useWishListStore((state) => state.wishlist)
    

    const [size, setSize] = useState('M');
    const [mainImg, setMainImg] = useState(product.featuredimage);
    const [currentQty, setCurrentQty] = useState(1);

    const alreadyWishlisted =
        wishlist.filter((wItem) => wItem.id === product.id).length > 0;

    useEffect(() => {
        setMainImg(product.featuredimage);
    }, []);

    const handleSize = (value) => {
        setSize(value);
    };

    const currentItem = {
         key:product.id,
         id:product.id,
         price:product.price,
         collectionId:product.collectionId,
         name:product.name,
         featuredimage:imageurl(product.collectionId, product.id, product.featuredimage),
         otherimages:imageurl(product.collectionId, product.id, product.otherimages[0]),
         qty:product.qty
    };

    const handleWishlist = () => {
        alreadyWishlisted
            ? deleteWishlistItem(currentItem)
            : setWishList(currentItem);
    };

    return (
        <main id='main-content'>
            {/* ===== Breadcrumb Section ===== */}
            <div className='bg-lightgreen h-16 w-full flex items-center border-t-2 border-gray200'>
                <div className='app-x-padding app-max-width w-full'>
                    <div className='breadcrumb'>
                        <Link href='/' className='text-gray400'>
                            Home
                        </Link>{' '}
                        /{' '}
                        <Link href={`/product-category/${product.categoryName}`} className="text-gray400 capitalize">
                            {product.categoryName}
                        </Link>{' '}
                        / <span>{product.name}</span>
                    </div>
                </div>
            </div>
            {/* ===== Main Content Section ===== */}
            <div className='itemSection app-max-width app-x-padding flex flex-col md:flex-row'>
                <div className='imgSection w-full md:w-1/2 h-full flex'>
                    <div className='hidden sm:block w-full sm:w-1/4 h-full space-y-4 my-4'>
                        <Image
                            className={`cursor-pointer ${mainImg === product.featuredimage
                                ? 'opacity-100 border border-gray300'
                                : 'opacity-50'
                                }`}
                            onClick={() => setMainImg(product.featuredimage)}
                            src={`${imageurl(product.collectionId, product.id, product.featuredimage)}?thumb=1000x1282`}
                            alt={product.name}
                            width={1000}
                            height={1282}
                        />
                        {product && product.otherimages.map(img=>(
                            <Image
                                className={`cursor-pointer ${mainImg === img
                                    ? 'opacity-100 border border-gray300'
                                    : 'opacity-50'
                                    }`}
                                onClick={() => setMainImg(img)}
                                src={`${imageurl(product.collectionId, product.id, img)}?thumb=1000x1282`}
                                alt={product.name}
                                width={1000}
                                height={1282}
                            />
                        ))}
                    </div>
                    <div className='w-full sm:w-3/4 h-full m-0 sm:m-4'>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={0}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            className='mySwiper sm:hidden'>
                            <SwiperSlide>
                                <Image
                                    className='each-slide w-full'
                                    src={`${imageurl(product.collectionId, product.id, mainImg)}?thumb=1000x1282`}
                                    width={1000}
                                    height={1282}
                                    alt={product.name}
                                />
                            </SwiperSlide>
                            {product && product.otherimages.map(img => (
                            <SwiperSlide>
                                <Image
                                    className='each-slide w-full'
                                    src={`${imageurl(product.collectionId, product.id, img)}?thumb=1000x1282`}
                                    width={1000}
                                    height={1282}
                                    alt={product.name}
                                />
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className='infoSection w-full md:w-1/2 h-auto py-8 sm:pl-4 flex flex-col'>
                    <h1 className='text-3xl mb-4'>{product.name}</h1>
                    <span className='text-2xl text-gray400 mb-2'>
                        $ {product.price}
                    </span>
                    <span className='mb-2'>
                        {'Availability'}: {'In stock'}
                    </span>
                    <span className='mb-2'>
                        {'Size'}: {size}
                    </span>
                    <div className='sizeContainer flex space-x-4 text-sm mb-4'>
                        <div
                            onClick={() => handleSize('S')}
                            className={`w-8 h-8 flex items-center justify-center border ${size === 'S'
                                ? 'border-gray500'
                                : 'border-gray300 text-gray400'
                                } cursor-pointer hover:bg-gray500 hover:text-gray100`}>
                            S
                        </div>
                        <div
                            onClick={() => handleSize('M')}
                            className={`w-8 h-8 flex items-center justify-center border ${size === 'M'
                                ? 'border-gray500'
                                : 'border-gray300 text-gray400'
                                } cursor-pointer hover:bg-gray500 hover:text-gray100`}>
                            M
                        </div>
                        <div
                            onClick={() => handleSize('L')}
                            className={`w-8 h-8 flex items-center justify-center border ${size === 'L'
                                ? 'border-gray500'
                                : 'border-gray300 text-gray400'
                                } cursor-pointer hover:bg-gray500 hover:text-gray100`}>
                            L
                        </div>
                    </div>

                    <span className='mb-2'>
                        {'Size'}: {size}
                    </span>
                    <div className='sizeContainer flex space-x-4 text-sm mb-4'>
                        <div
                            onClick={() => handleSize('S')}
                            className={`w-8 h-8 flex items-center justify-center border ${size === 'S'
                                ? 'border-gray500'
                                : 'border-gray300 text-gray400'
                                } cursor-pointer hover:bg-gray500 hover:text-gray100`}>
                            S
                        </div>
                        <div
                            onClick={() => handleSize('M')}
                            className={`w-8 h-8 flex items-center justify-center border ${size === 'M'
                                ? 'border-gray500'
                                : 'border-gray300 text-gray400'
                                } cursor-pointer hover:bg-gray500 hover:text-gray100`}>
                            M
                        </div>
                        <div
                            onClick={() => handleSize('L')}
                            className={`w-8 h-8 flex items-center justify-center border ${size === 'L'
                                ? 'border-gray500'
                                : 'border-gray300 text-gray400'
                                } cursor-pointer hover:bg-gray500 hover:text-gray100`}>
                            L
                        </div>
                    </div>
                    <div className='addToCart flex flex-col sm:flex-row md:flex-col lg:flex-row space-y-4 sm:space-y-0 mb-4'>
                        <div className='plusOrMinus h-12 flex border justify-center border-gray300 divide-x-2 divide-gray300 mb-4 mr-0 sm:mr-4 md:mr-0 lg:mr-4'>
                            <div
                                onClick={() => setCurrentQty((prevState) => prevState - 1)}
                                className={`${currentQty === 1 && 'pointer-events-none'
                                    } h-full w-full sm:w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100`}>
                                -
                            </div>
                            <div className='h-full w-28 sm:w-12 flex justify-center items-center pointer-events-none'>
                                {currentQty}
                            </div>
                            <div
                                onClick={() => setCurrentQty((prevState) => prevState + 1)}
                                className='h-full w-full sm:w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100'>
                                +
                            </div>
                        </div>
                        <div className='flex h-12 space-x-4 w-full'>
                            <Button
                                value={'Add to cart'}
                                size='lg'
                                extraClass={`flex-grow text-center whitespace-nowrap`}
                                onClick={() =>  addToCart(currentItem)}
                            />
                            <GhostButton onClick={handleWishlist}>
                                {alreadyWishlisted ? (
                                    <HeartSolid extraClass='inline' />
                                ) : (
                                    <Heart extraClass='inline' />
                                )}
                            </GhostButton>
                        </div>
                    </div>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className='py-2 focus:outline-none text-left mb-4 border-b-2 border-gray200 flex items-center justify-between'>
                                    <span>{'Details'}</span>
                                    <DownArrow
                                        extraClass={`${open ? '' : 'transform rotate-180'
                                            } w-5 h-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel
                                    className={`text-gray400 animate__animated animate__bounceIn`}>
                                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                    <div className='flex items-center space-x-4 mt-4'>
                        <span>{'Share'}</span>
                        <FacebookLogo extraClass='h-4 cursor-pointer text-gray400 hover:text-gray500' />
                        <InstagramLogo extraClass='h-4 cursor-pointer text-gray400 hover:text-gray500' />
                    </div>
                </div>
            </div>
            {/* ===== Horizontal Divider ===== */}
            <div className='border-b-2 border-gray200'></div>

            {/* ===== You May Also Like Section ===== */}
            <div className='recSection my-8 app-max-width app-x-padding'>
                <h2 className='text-3xl mb-6'>{'You may also like'}</h2>
                <Swiper
                    slidesPerView={2}
                    // centeredSlides={true}
                    spaceBetween={10}
                    loop={true}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                        type: 'bullets',
                    }}
                    className='mySwiper card-swiper sm:hidden'>
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className='mb-6'>
                                <Card
                                    id={product.id}
                                    price={product.price}
                                    collectionId={product.collectionId}
                                    name={product.name}
                                    featuredimage={imageurl(product.collectionId, product.id, product.featuredimage)}
                                    otherimages={imageurl(product.collectionId, product.id, product.otherimages[0])}
                                    qty={product.qty}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10'>
                    {products.map((product) => (
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
                    ))}
                </div>
            </div>
        </main>
    );
};


export default Product;
