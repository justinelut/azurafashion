"use client"
import { Fragment, useEffect, useState } from "react";
import { Menu as HMenu } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import MenuIcon from "/public/icons/MenuIcon";
import AuthForm from "@/components/Auth/AuthForm";
import WhistlistIcon from "/public/icons/WhistlistIcon";
import UserIcon from "/public/icons/UserIcon";
import SearchIcon from "/public/icons/SearchIcon";
import DownArrow from "/public/icons/DownArrow";
import InstagramLogo from "/public/icons/InstagramLogo";
import FacebookLogo from "/public/icons/FacebookLogo";
import { useAuth } from "@/context/AuthContext";
import AccountBalanceIcon from "/public/icons/AccountBalanceIcon";
import { useWishListStore } from "@/context/wishlist/wishlisttore";
import { pb } from "@/app/pocketbase";
import Accountdetails from "@/components/Auth/Accountdetails";
import { useRouter } from "next/navigation";

export default function Menu({ accountBalance,}) {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const setWishList = useWishListStore((state) => state.setWishList)
  const wishlist = useWishListStore((state) => state.wishlist)
  const router = useRouter()
  
  // Calculate Number of Wishlist
  let noOfWishlist = wishlist.length;

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    router.push(`/search?q=${searchValue}`);
  };

  const handleChange = (e) => {
    setSearchValue((e.target).value);
  };

  const authuserisvalid = pb.authStore.isValid

  return <>
    <div className='relative'>
      <button
        type='button'
        aria-label='Hamburger Menu'
        onClick={openModal}
        className='focus:outline-none'>
        <MenuIcon />
      </button>
    </div>
    <Transition
      show={open}
      as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        style={{ zIndex: 99999 }}
        static
        open={open}
        onClose={closeModal}>
        <div className='min-h-screen'>
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className='fixed inset-0 bg-gray500 opacity-50' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-linear duration-600'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-linear duration-300'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'>
            <div
              style={{ height: '100vh' }}
              className='relative opacity-95 overflow-y-auto inline-block dur h-screen w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl'>
              <div className='flex justify-between items-center p-6 pb-0'>
                <Link href='/'>
                    <Image
                      className='justify-center'
                      src='/logo.svg'
                      alt='Picture of the author'
                      width={85}
                      height={22}
                    />
                </Link>
                <button
                  type='button'
                  className='outline-none focus:outline-none text-3xl sm:text-2xl'
                  onClick={closeModal}>
                  &#10005;
                </button>
              </div>

              <div className='mb-10'>
                <div className='itemContainer px-6 w-full flex flex-col justify-around items-center'>
                  <form
                    className='flex w-full justify-between items-center mt-5 mb-5 border-gray300 border-b-2'
                    onSubmit={handleSubmit}>
                    <SearchIcon extraClass='text-gray300 w-6 h-6' />
                    <input
                      type='search'
                      placeholder={'Search anything'}
                      className='px-4 py-2 w-full focus:outline-none text-xl'
                      onChange={handleChange}
                    />
                  </form>
                  <Link href='/product-category/men' className='w-full text-xl hover:bg-gray100 text-left py-2'
                    onClick={closeModal}>
                      Men
                  </Link>
                  <Link href='/product-category/women' className='w-full text-xl hover:bg-gray100 text-left py-2'
                    onClick={closeModal}>
                     
                      Women
                  </Link>
                  <Link href='/product-category/kids' className='w-full text-xl hover:bg-gray100 text-left py-2'
                    onClick={closeModal}>
                     
                     Kids
                  
                  </Link>
                  <Link href='/about' className='w-full text-xl hover:bg-gray100 text-left py-2'
                    onClick={closeModal}>
                   
                     
                      About us
                  
                  </Link>
                  <Link href='/contact' className='w-full text-xl hover:bg-gray100 text-left py-2'
                    onClick={closeModal}>
                   
                      
                     Contact us
                  
                  </Link>
                  <hr className='border border-gray300 w-full mt-2' />
                  <div className='w-full text-xl py-2 my-3 flex justify-between'>
                    {
                      authuserisvalid ? (
                        <Accountdetails extraClass='flex justify-between w-full'>
                          <span>Account</span>
                          <UserIcon />
                        </Accountdetails>
                      ) :
                        (
                          <AuthForm extraClass='flex justify-between w-full'>
                            <span>Login</span>
                            <UserIcon />
                          </AuthForm>
                        )
                    }
                  </div>
                  <hr className='border border-gray300 w-full' />
                  <Link href='/wishlist' className='text-xl py-2 my-3 w-full flex justify-between'>
                    <>
                      <span>Wishlist</span>
                      <div className='relative'>
                        <WhistlistIcon />
                        {noOfWishlist > 0 && (
                          <span
                            className={`absolute text-xs -top-0 -left-7 bg-gray500 text-gray100 py-1 px-2 rounded-full`}>
                            {noOfWishlist}
                          </span>
                        )}
                      </div>
                          </>
                  </Link>
                  
                  <hr className='border border-gray300 w-full' />


                  {/* Locale Dropdown */}
                  <HMenu
                    as='div'
                    className='relative bg-gray100 mt-4 mb-2 w-full'>
                    <HMenu.Button
                      as='a'
                      href='#'
                      className='flex justify-center items-center py-2 px-4 text-center'>
                      English
                      <DownArrow />
                    </HMenu.Button>
                    <HMenu.Items
                      className='flex flex-col w-full right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none'
                      style={{ zIndex: 9999 }}>
                      <HMenu.Item>
                        <Link
                          href="/"
                          className={`$bg-gray200 text-gray500 py-2 px-4 text-center focus:outline-none`}>
                         English
                        </Link>
                      </HMenu.Item>
                      <HMenu.Item>
                        <Link
                          href="/"
                          className={`$bg-gray200 text-gray500 py-2 px-4 text-center focus:outline-none`}>
                         Swahili
                        </Link>
                      </HMenu.Item>
                    </HMenu.Items>
                  </HMenu>

                  {/* Currency Dropdown */}
                  <HMenu
                    as='div'
                    className='relative bg-gray100 my-2 w-full'>
                    <HMenu.Button
                      as='a'
                      href='#'
                      className='flex justify-center items-center py-2 px-4 text-center'>
                      {'Usd'} <DownArrow />
                    </HMenu.Button>
                    <HMenu.Items
                      className='flex flex-col w-full right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none'
                      style={{ zIndex: 9999 }}>
                      <HMenu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={`${active
                                ? 'bg-gray100 text-gray500'
                                : 'bg-white text-gray500'
                              } py-2 px-4 text-center focus:outline-none`}>
                            {'Usd'}
                          </a>
                        )}
                      </HMenu.Item>
                      <HMenu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={`${active
                                ? 'bg-gray100 text-gray500'
                                : 'bg-white text-gray500'
                              } py-2 px-4 text-center focus:outline-none`}>
                            {'Swl'}
                          </a>
                        )}
                      </HMenu.Item>
                    </HMenu.Items>
                  </HMenu>

                  <div className='flex my-10 w-2/5 space-x-6 justify-center'>
                    <a
                      href='#'
                      className='text-gray400 w-10 h-10 py-1 px-auto flex justify-center rounded-md active:bg-gray300'
                      aria-label='Haru Fashion Facebook Page'>
                      <FacebookLogo extraClass='h-8' />
                    </a>
                    <a
                      href='#'
                      className='text-gray400 w-10 h-10 py-1 px-auto flex justify-center rounded-md active:bg-gray300'
                      aria-label='Haru Fashion Facebook Page'>
                      <InstagramLogo extraClass='h-8' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  </>
}
