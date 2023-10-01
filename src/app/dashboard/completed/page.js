"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LeftArrow from '/public/icons/LeftArrow';
import Button from '@/components/Buttons/Button';
import GhostButton from '@/components/Buttons/GhostButton';
import { roundDecimal } from '@/components/Util/utilFunc';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart/cart'
// let w = window.innerWidth;

const Orders = () => {
    const router = useRouter();
    const [deli, setDeli] = useState('Pickup');
    const cartItems = useCart((state) => state.cartItems);
    const decrementQuantity = useCart((state) => state.decrementQuantity);
    const incrementQuantity = useCart((state) => state.incrementQuantity);
    const removeFromCart = useCart((state) => state.removeFromCart);
    const clearCart = useCart((state) => state.clearCart);

    let subtotal = 0;

    let deliFee = 0;
    if (deli === 'Yangon') {
        deliFee = 2.0;
    } else if (deli === 'Others') {
        deliFee = 7.0;
    }

    return (
        <main id='main-content'>
            {/* ===== Heading & Continue Shopping */}
            <div className='app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100'>
                <h1 className='text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animatee__animated animate__bounce'>
                    Completed orders
                </h1>
                <div className='mt-6 mb-3'>
                    <Link href='/dashboard' className='inline-block'>
                        <LeftArrow
                            size='sm'
                            extraClass='inline-block'
                        />{' '}
                        Dashboard
                    </Link>
                </div>
            </div>

            <div className='app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row'>
                <div className='h-full w-full lg:w-4/6 mr-4'>
                    <table className='w-full mb-6'>
                        <thead>
                            <tr className='border-t-2 border-b-2 border-gray200'>
                                <th className='font-normal text-left sm:text-center py-2 xl:w-72'>
                                    Product Details
                                </th>
                                <th
                                    className={`font-normal py-2 hidden sm:block ${cartItems.length === 0 ? 'text-center' : 'text-right'
                                        }`}>
                                    Unit Price
                                </th>
                                <th className='font-normal py-2'>Quantity</th>
                                <th className='font-normal py-2 text-right'>Amount</th>
                                <th
                                    className='font-normal py-2 text-right'
                                    style={{ minWidth: '3rem' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length === 0 ? (
                                <tr className='w-full text-center h-60 border-b-2 border-gray200'>
                                    <td colSpan={5}>Cart is empty</td>
                                </tr>
                            ) : (
                                cartItems.map((item) => {
                                    subtotal += item.price * item.qty;
                                    return (
                                        <tr
                                            className='border-b-2 border-gray200'
                                            key={item.id}>
                                            <td className='my-3 flex flex-col xl:flex-row items-start sm:items-center xl:space-x-2 text-center xl:text-left'>
                                                <Link
                                                    href={`/products/${encodeURIComponent(item.id)}`}>

                                                    <Image
                                                        src={`${item.featuredimage}?thumb=95x128`}
                                                        alt={item.name}
                                                        width={95}
                                                        height={128}
                                                        className='h-32 xl:mr-4'
                                                    />

                                                </Link>
                                                <span>{item.name}</span>
                                            </td>
                                            <td className='text-right text-gray400 hidden sm:table-cell'>
                                                $ {roundDecimal(item.price)}
                                            </td>
                                            <td>
                                                <div className='w-12 h-32 sm:h-auto sm:w-3/4 md:w-2/6 mx-auto flex flex-col-reverse sm:flex-row border border-gray300 sm:divide-x-2 divide-gray300'>
                                                    <div
                                                        onClick={() => decrementQuantity(item.id)}
                                                        className='h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100'>
                                                        -
                                                    </div>
                                                    <div className='h-full w-12 flex justify-center items-center pointer-events-none'>
                                                        {item.qty}
                                                    </div>
                                                    <div
                                                        onClick={() => incrementQuantity(item.id)}
                                                        className='h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100'>
                                                        +
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-right text-gray400'>
                                                $ {roundDecimal(item.price * item.qty)}
                                                <br />
                                                <span className='text-xs'>
                                                    ($ {roundDecimal(item.price)})
                                                </span>
                                            </td>
                                            <td
                                                className='text-right'
                                                style={{ minWidth: '3rem' }}>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    type='button'
                                                    className='outline-none text-gray300 hover:text-gray500 focus:outline-none text-4xl sm:text-2xl'>
                                                    &#10005;
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                    <div>
                        <GhostButton
                            onClick={clearCart}
                            extraClass='hidden sm:inline-block'>
                            Clear cart
                        </GhostButton>
                    </div>
                </div>
                <div className='h-full w-full lg:w-4/12 mt-10 lg:mt-0'>
                    {/* Cart Totals */}
                    <div className='border border-gray500 divide-y-2 divide-gray200 p-6'>
                        <h2 className='text-xl mb-3'>Cart totals</h2>
                        <div className='flex justify-between py-2'>
                            <span className='uppercase'>Subtotal</span>
                            <span>$ {roundDecimal(subtotal)}</span>
                        </div>
                        <div className='py-3'>
                            <span className='uppercase'>Delivery</span>
                            <div className='mt-3 space-y-2'>
                                <div className='flex justify-between'>
                                    <div>
                                        <input
                                            type='radio'
                                            name='deli'
                                            value='Pickup'
                                            id='pickup'
                                            checked={deli === 'Pickup'}
                                            onChange={() => setDeli('Pickup')}
                                        />{' '}
                                        <label
                                            htmlFor='pickup'
                                            className='cursor-pointer'>
                                            Store pickup
                                        </label>
                                    </div>
                                    <span>Free</span>
                                </div>
                                <div className='flex justify-between'>
                                    <div>
                                        <input
                                            type='radio'
                                            name='deli'
                                            value='Yangon'
                                            id='ygn'
                                            checked={deli === 'Yangon'}
                                            onChange={() => setDeli('Yangon')}
                                        // defaultChecked
                                        />{' '}
                                        <label
                                            htmlFor='ygn'
                                            className='cursor-pointer'>
                                            Within Nakuru
                                        </label>
                                    </div>
                                    <span>$ 2.00</span>
                                </div>
                                <div className='flex justify-between'>
                                    <div>
                                        <input
                                            type='radio'
                                            name='deli'
                                            value='Others'
                                            id='others'
                                            checked={deli === 'Others'}
                                            onChange={() => setDeli('Others')}
                                        />{' '}
                                        <label
                                            htmlFor='others'
                                            className='cursor-pointer'>
                                            Other Cities
                                        </label>
                                    </div>
                                    <span>$ 7.00</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between py-3'>
                            <span>Grand total</span>
                            <span>$ {roundDecimal(subtotal + deliFee)}</span>
                        </div>
                        <Button
                            value="Proceed to checkout"
                            size='xl'
                            extraClass='w-full'
                            onClick={() => router.push(`/checkout`)}
                            disabled={cartItems.length < 1 ? true : false}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};


export default Orders;
