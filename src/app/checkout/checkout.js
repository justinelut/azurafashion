"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { roundDecimal } from "@/components/Util/utilFunc";
import { useCart } from "@/context/cart/cart";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { checkoutschema } from "@/components/Auth/schemavalidation";
import { zodResolver } from "@hookform/resolvers/zod";
import MpesaLogo from '@/app/checkout/mpesa/mpesalogo.png'
import { mpesapay } from "@/app/checkout/actions";
import { pb } from "@/app/pocketbase";
import { useAccountBalance } from "@/components/Header/AccountBalance";
import AuthForm from "@/components/Auth/AuthForm";


// let w = window.innerWidth;

const Checkout = () => {
    const auth = useAuth();
    const [deli, setDeli] = useState("STORE_PICKUP");
    const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(checkoutschema) });
    const cartItems = useCart((state) => state.cartItems);
    const clearCart = useCart((state) => state.clearCart);
    const accountBalance = useAccountBalance()
    const authuserisvalid = pb.authStore.isValid
    // Form Fields

    const [password, setPassword] = useState("");
    const [diffAddr, setDiffAddr] = useState(false);
    const [address, setAddress] = useState(auth.user?.shippingAddress || "");
    const [shippingAddress, setShippingAddress] = useState("");
    const [isOrdering, setIsOrdering] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [completedOrder, setCompletedOrder] = useState(null);
    const [orderError, setOrderError] = useState("");
    const [sendEmail, setSendEmail] = useState(false);
    const [usernameError, setUsernameError] = useState()
    const [emailError, setEmailError] = useState()


    const [checkPhone, setCheckPhone] = useState()
    const [mpesaError, setMpesaError] = useState()

    const products = cartItems.map((item) => ({
        id: item.id,
        quantity: item.qty,
    }));


    let subtotal = 0;

    subtotal = roundDecimal(
        cartItems.reduce(
            (accumulator, currentItem) =>
                accumulator + currentItem.price * currentItem.qty,
            0
        )
    );

    let deliFee = 0;
    if (deli === "YANGON") {
        deliFee = 2.0;
    } else if (deli === "OTHERS") {
        deliFee = 7.0;
    }


    const onSubmit = async (data, e) => {
        e.preventDefault()
        const results = await mpesapay({ amount: 1, phonenumber: 254740455200 })
        if (results && results.message) {
            setCheckPhone(results.message)
        } else {
            setMpesaError(results.error)
        }


        // const details = {
        //     username: data.username,
        //     email: data.email,
        //     emailVisibility: true,
        //     password: data.password,
        //     passwordConfirm: data.passwordconfirm,
        //     name: data.name,
        //     phone: data.phone
        // }
        // try {
        //     const createAccount = await pb.collection('users').create(details)
        //     createAccount && pb.collection('users').requestVerification(details.email);
        //     createAccount && setSuccess("Your Account was created successfully")
        //     createAccount && setTimeout(() => {
        //         onLogin()
        //     }, 3000)
        // } catch (err) {
        //     if (err.data.data.email.message) {
        //         setEmailError(err.data.data.email.message)
        //     }
        //     else
        //         setEmailError(null)

        //     if (err.data.data.username.message)
        //         setUsernameError(err.data.data.username.message)
        //     else
        //         setUsernameError(null)
        // }
    };


    useEffect(() => {
        const setupSubscription = async () => {
            // Subscribe to changes in any fashion_payments record
            const subscription1 = await pb.collection('fashion_payments').subscribe('*', function (e) {
                console.log(e.record);
            });
            // Clean up the subscriptions when the component unmounts
            return () => {
                subscription1.unsubscribe();
            };
        };

        setupSubscription();
    }, []);


    return (
        <main id="main-content">
            {/* ===== Heading & Continue Shopping */}
            <div className="app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100">
                <h1 className="text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animatee__animated animate__bounce">
                    Checkout
                </h1>
            </div>



            {!completedOrder ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row">
                        <div className="h-full w-full lg:w-7/12 border-2 border-gray200 p-6 mr-8">
                            {/* <Profile /> */}

                            <div className="pt-2">

                                {authuserisvalid ? (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-base uppercase mb-3">
                                                Personal Details
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-base font-medium">
                                                Email: {pb?.authStore?.model?.email}

                                            </div>
                                            <div className="text-base font-medium">
                                                Full names: {pb?.authStore?.model?.name}

                                            </div>

                                            <div className="py-3 flex justify-between">
                                                <span className="uppercase">Account Balance</span>
                                                <span>$ {accountBalance && accountBalance} </span>
                                            </div>

                                            <div className="text-base font-medium">
                                                Address
                                            </div>
                                        </div>
                                    </>
                                ) :
                                    (
                                        <div className="grid bg-gray-100 rounded place-content-center mb-6">
                                            <div className="text-center lg:text-left">
                                                <header className="divide-y-2 divide-gray200">
                                                    <h2 className="text-xl py-4 font-bold text-gray-900 sm:text-3xl">Lucy fashion, Login to continue</h2>
                                                    <p className="py-3">To access all the features and make purchases, an account is required. Creating an account allows you to save your shipping addresses, track your orders, and enjoy a personalized shopping experience.</p>
                                                    <p className="py-3">If you already have an account, please log in below:</p>
                                                </header>


                                                <AuthForm>
                                                    <button
                                                        type="button"
                                                        className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray500 border border-gray-900 rounded hover:shadow focus:outline-none focus:ring"
                                                    >
                                                        Login
                                                    </button>
                                                </AuthForm>

                                            </div>
                                        </div>
                                    )}
                            </div>

                            <div className="my-4">
                                <label htmlFor="address" className="text-lg">
                                    Address
                                </label>
                                <textarea
                                    aria-label="Address"
                                    name="address"
                                    className={`w-full mt-1 mb-2 ${errors && errors.address ? 'placeholder-red border-2 border-red focus:border-red' : 'border-2  border-gray400 focus:border-gray500'} p-4 outline-none`}
                                    placeholder="John Doe
                                                    123 Main Street
                                                    Anytown, USA
                                                    Postal Code: 12345"
                                    rows={4}
                                    // value={address}
                                    {...register("address", { required: true })}
                                />
                            </div>

                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input
                                    type="checkbox"
                                    name="toggle"
                                    id="toggle"
                                    checked={diffAddr}
                                    onChange={() => setDiffAddr(!diffAddr)}
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray300 appearance-none cursor-pointer"
                                />
                                <label
                                    htmlFor="toggle"
                                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray300 cursor-pointer"
                                ></label>
                            </div>
                            <label htmlFor="toggle" className="text-xs text-gray-700">
                                Different shipping address
                            </label>

                            {diffAddr && (
                                <div className="my-4">
                                    <label htmlFor="shipping_address" className="text-lg">
                                        Shipping address
                                    </label>
                                    <textarea
                                        id="shipping_address"
                                        aria-label="shipping address"
                                        className="w-full mt-1 mb-2 border-2 border-gray400 p-4 outline-none"
                                        rows={4}
                                        value={shippingAddress}
                                        onChange={(e) =>
                                            setShippingAddress(
                                                (e.target).value
                                            )
                                        }
                                    />
                                </div>
                            )}


                            <div className="text-sm text-gray400 mt-8 leading-6">
                                Form note
                            </div>

                        </div>
                        <div className="h-full w-full lg:w-5/12 mt-10 lg:mt-4">
                            {/* Cart Totals */}
                            <div className="border border-gray500 p-6 divide-y-2 divide-gray200">
                                <div className="flex justify-between">
                                    <span className="text-base uppercase mb-3">
                                        Product
                                    </span>
                                    <span className="text-base uppercase mb-3">
                                        Subtotal
                                    </span>
                                </div>

                                <div className="pt-2">
                                    {cartItems.map((item) => (
                                        <div className="flex justify-between mb-2" key={item.id}>
                                            <span className="text-base font-medium">
                                                {item.name}{" "}
                                                <span className="text-gray400">x {item.qty}</span>
                                            </span>
                                            <span className="text-base">
                                                $ {roundDecimal(item.price * item.qty)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="py-3 flex justify-between">
                                    <span className="uppercase">Subtotal</span>
                                    <span>$ {subtotal}</span>
                                </div>

                                <div className="py-3">
                                    <span className="uppercase">Delivery</span>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex justify-between">
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="deli"
                                                    value="STORE_PICKUP"
                                                    id="pickup"
                                                    checked={deli === "STORE_PICKUP"}
                                                    onChange={() => setDeli("STORE_PICKUP")}
                                                />{" "}
                                                <label htmlFor="pickup" className="cursor-pointer">
                                                    Store pickup
                                                </label>
                                            </div>
                                            <span>Free</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="deli"
                                                    value="YANGON"
                                                    id="ygn"
                                                    checked={deli === "YANGON"}
                                                    onChange={() => setDeli("YANGON")}
                                                // defaultChecked
                                                />{" "}
                                                <label htmlFor="ygn" className="cursor-pointer">
                                                    Within Nakuru
                                                </label>
                                            </div>
                                            <span>$ 2.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="deli"
                                                    value="OTHERS"
                                                    id="others"
                                                    checked={deli === "OTHERS"}
                                                    onChange={() => setDeli("OTHERS")}
                                                />{" "}
                                                <label htmlFor="others" className="cursor-pointer">
                                                    Other cities
                                                </label>
                                            </div>
                                            <span>$ 7.00</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between py-3">
                                        <span>Grand total</span>
                                        <span>$ {roundDecimal(+subtotal + deliFee)}</span>
                                    </div>

                                    <div className="grid gap-4 mt-2 mb-4">
                                        <label
                                            htmlFor="plan-cash"
                                            className="relative flex flex-col bg-white p-5 rounded-lg shadow-md border border-gray300 cursor-pointer"
                                        >
                                            <span className="font-semibold text-gray-500 text-base leading-tight capitalize">
                                                Cash on delivery
                                            </span>
                                            <input
                                                type="radio"
                                                name="plan"
                                                id="plan-cash"
                                                value="CASH_ON_DELIVERY"
                                                className="absolute h-0 w-0 appearance-none"
                                                onChange={() => setPaymentMethod("CASH_ON_DELIVERY")}
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={`${paymentMethod === "CASH_ON_DELIVERY"
                                                    ? "block"
                                                    : "hidden"
                                                    } absolute inset-0 border-2 border-gray500 bg-opacity-10 rounded-lg`}
                                            >
                                                <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-gray100">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="h-5 w-5 text-green-600"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                        </label>
                                        <label
                                            htmlFor="plan-bank"
                                            className="relative flex flex-col bg-white p-5 rounded-lg shadow-md border border-gray300 cursor-pointer"
                                        >
                                            <span className="font-semibold text-gray-500 leading-tight capitalize">
                                                <Image src={MpesaLogo} width={100} height={10} />
                                            </span>
                                            <input
                                                type="radio"
                                                name="plan"
                                                id="plan-bank"
                                                value="BANK_TRANSFER"
                                                className="absolute h-0 w-0 appearance-none"
                                                onChange={() => setPaymentMethod("MPESA_PAY")}
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={`${paymentMethod === "MPESA_PAY" ? "block" : "hidden"
                                                    } absolute inset-0 border-2 border-gray500 bg-opacity-10 rounded-lg`}
                                            >
                                                <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-gray100">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="h-5 w-5 text-green-600"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                        </label>
                                        {paymentMethod == "MPESA_PAY" && (
                                            <span className="text-gray400 text-sm mt-2">
                                                <input
                                                    type="text"
                                                    placeholder={`${"Phone number"}`}
                                                    name="phone"
                                                    className={`w-full border-2 ${errors && errors.phone ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
                                                    {...register("phone", { required: true })}
                                                />
                                                {errors && errors.phone && (
                                                    <span className="text-sm text-red">{errors && errors.phone.message}</span>
                                                )}
                                                {checkPhone && <span className="text-sm text-green500">{checkPhone && checkPhone}</span>}
                                                {mpesaError && <span className="text-sm text-red">{mpesaError && mpesaError}</span>}
                                            </span>
                                        )}

                                    </div>

                                    <div className="my-8">
                                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input
                                                type="checkbox"
                                                name="send-email-toggle"
                                                id="send-email-toggle"
                                                checked={sendEmail}
                                                onChange={() => setSendEmail(!sendEmail)}
                                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray300 appearance-none cursor-pointer"
                                            />
                                            <label
                                                htmlFor="send-email-toggle"
                                                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray300 cursor-pointer"
                                            ></label>
                                        </div>
                                        <label
                                            htmlFor="send-email-toggle"
                                            className="text-xs text-gray-700"
                                        >
                                            Send order email
                                        </label>
                                    </div>
                                </div>

                                <Button
                                    value={"Place order"}
                                    size="xl"
                                    type="submit"
                                    extraClass={`w-full`}
                                />
                            </div>

                            {orderError !== "" && (
                                <span className="text-red text-sm font-semibold">
                                    - {orderError}
                                </span>
                            )}
                        </div>
                    </div>
                </form>
            ) : (
                <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 mt-6">
                    <div className="text-gray400 text-base">Thank you note</div>

                    <div className="flex flex-col md:flex-row">
                        <div className="h-full w-full md:w-1/2 mt-2 lg:mt-4">
                            <div className="border border-gray500 p-6 divide-y-2 divide-gray200">
                                <div className="flex justify-between">
                                    <span className="text-base uppercase mb-3">
                                        Order id
                                    </span>
                                    <span className="text-base uppercase mb-3">
                                        {completedOrder.orderNumber}
                                    </span>
                                </div>

                                <div className="pt-2">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-base">Email address</span>
                                        <span className="text-base">justinequartz@gmail.com</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-base">Order date</span>
                                        <span className="text-base">
                                            {new Date(
                                                completedOrder.orderDate
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-base">Delivery date</span>
                                        <span className="text-base">
                                            {new Date(
                                                completedOrder.deliveryDate
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="py-3">
                                    <div className="flex justify-between mb-2">
                                        <span className="">Payment method</span>
                                        <span>{completedOrder.paymentType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="">Delivery method</span>
                                        <span>{completedOrder.deliveryType}</span>
                                    </div>
                                </div>

                                <div className="pt-2 flex justify-between mb-2">
                                    <span className="text-base uppercase">Total</span>
                                    <span className="text-base">
                                        $ {completedOrder.totalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="h-full w-full md:w-1/2 md:ml-8 mt-4 md:mt-2 lg:mt-4">
                            <div>
                                Your order received
                                {completedOrder.paymentType === "BANK_TRANSFER" &&
                                    "Bank transfer note"}
                                {completedOrder.paymentType === "CASH_ON_DELIVERY" &&
                                    completedOrder.deliveryType !== "STORE_PICKUP" &&
                                    "Cash delivery note"}
                                {completedOrder.deliveryType === "STORE_PICKUP" &&
                                    "Store pickup note"}
                                {"Thank you for purchasing"}
                            </div>

                            {completedOrder.paymentType === "BANK_TRANSFER" ? (
                                <div className="mt-6">
                                    <h2 className="text-xl font-bold">
                                        Our banking details
                                    </h2>
                                    <span className="uppercase block my-1">Sat Naing :</span>

                                    <div className="flex justify-between w-full xl:w-1/2">
                                        <span className="text-sm font-bold">AYA Bank</span>
                                        <span className="text-base">20012345678</span>
                                    </div>
                                    <div className="flex justify-between w-full xl:w-1/2">
                                        <span className="text-sm font-bold">CB Bank</span>
                                        <span className="text-base">0010123456780959</span>
                                    </div>
                                    <div className="flex justify-between w-full xl:w-1/2">
                                        <span className="text-sm font-bold">KPay</span>
                                        <span className="text-base">095096051</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-56">
                                    <div className="w-3/4">
                                        <Image
                                            className="justify-center"
                                            src="/logo.svg"
                                            alt="Haru Fashion"
                                            width={220}
                                            height={50}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};


export default Checkout;
