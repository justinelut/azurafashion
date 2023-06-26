"use client"
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import BagIcon from "/public/icons/BagIcon";
import Button from "@/components/Buttons/Button";
import Item from "@/components/CartItem/Item";
import LinkButton from "@/components/Buttons/LinkButton";
import { roundDecimal } from "@/components/Util/utilFunc";
import { useRouter } from 'next/navigation'
import { useCartStore } from "@/context/cart/cartstore";
import { useCart } from "@/context/cart/cart";
export default function CartItem() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState("");
  const cart = useCartStore((state) => state.cart)
  const cartItems = useCart((state) => state.cartItems);
  const decrementQuantity = useCart((state) => state.decrementQuantity);
  const incrementQuantity = useCart((state) => state.incrementQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);
  let subtotal = 0;

  let noOfItems = 0;
  cartItems.forEach((item) => {
    noOfItems += item.qty;
  });

  const handleAnimate = useCallback(() => {
    if (noOfItems === 0) return;
    setAnimate("animate__animated animate__headShake");
    setTimeout(() => {
      setAnimate("");
    }, 0.1);
  }, [noOfItems, setAnimate]);

  // Set animate when no of items changes
  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  return (
    <>
      <div className="relative">
        <button type="button" onClick={openModal} aria-label="Cart">
          <BagIcon extraClass="h-8 w-8 sm:h-6 sm:w-6" />
          {noOfItems > 0 && (
            <span
              className={`${animate} absolute text-xs -top-3 bg-gray500 text-gray100 py-1 px-2 rounded-full`}
            >
              {noOfItems}
            </span>
          )}
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          style={{ zIndex: 99999 }}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen text-right">
            <Transition.Child
              as={Fragment}
            //   enter="ease-out duration-300"
            //   enterFrom="opacity-0"
            //   enterTo="opacity-100"
            //   leave="ease-in duration-200"
            //   leaveFrom="opacity-100"
            //   leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray500 opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-linear duration-600"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-linear duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div
                style={{ height: "100vh" }}
                className="relative inline-block dur h-screen w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl"
              >
                <div className="bg-lightgreen flex justify-between items-center p-6">
                  <h3 className="text-xl">
                    {"Cart"} ({noOfItems})
                  </h3>
                  <button
                    type="button"
                    className="outline-none focus:outline-none text-3xl sm:text-2xl"
                    onClick={closeModal}
                  >
                    &#10005;
                  </button>
                </div>

                <div className="h-full">
                  <div className="itemContainer px-4 h-2/3 w-full flex-grow flex-shrink overflow-y-auto">
                    {cartItems.map((item) => {
                      subtotal += item.price * item.qty;
                      return (
                        <Item
                          key={item.id}
                          name={item.name}
                          price={item.price * item.qty}
                          qty={item.qty}
                          img= {`${item.featuredimage}?thumb=95x128`}
                          onAdd={() => incrementQuantity(item.id)}
                          onRemove={() => decrementQuantity(item.id)}
                          onDelete={() => removeFromCart(item.id)}
                        />
                      );
                    })}
                  </div>
                  <div className="btnContainer mt-4 px-4 h-1/3 mb-20 w-full flex flex-col ">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>$ {roundDecimal(subtotal)}</span>
                    </div>
                    <LinkButton
                      href="/shopping-cart"
                      extraClass="my-4"
                      onClick={closeModal}
                      noBorder={false}
                      inverted={false}
                    >
                      View Cart
                    </LinkButton>
                    <Button
                      value={"Checkout"}
                      onClick={() => router.push(`/checkout`)}
                      disabled={cartItems.length < 1 ? true : false}
                      extraClass="text-center"
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
