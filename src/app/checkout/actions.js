'use server'
import MpesaPay from 'mpesapay';
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers';
import { getPocketBaseFromAuthCookie } from "@/app/pocketbaseserver";

const usedReferenceNumbers = new Set();

function generateUniqueReferenceNumber(prefix, length) {
    let referenceNumber;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    do {
        referenceNumber = `${prefix}-`;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            const randomChar = characters.charAt(randomIndex);
            referenceNumber += randomChar;
        }
    } while (usedReferenceNumbers.has(referenceNumber));
    usedReferenceNumbers.add(referenceNumber);
    return referenceNumber;
}

const referenceNumber = generateUniqueReferenceNumber('PL', 10);

export async function mpesapay(data) {
    const mpesaPay = new MpesaPay(
        process.env.NEXT_PUBLIC_MPESA_CONSUMER_KEY,
        process.env.NEXT_PUBLIC_MPESA_CONSUMER_SECRET,
        process.env.NEXT_PUBLIC_MPESA_BUSINESS_SHORT_CODE,
        process.env.NEXT_PUBLIC_MPESA_PASS_KEY,
        referenceNumber,
        'sandbox',
        "Pixelabs Inc"
    );


    const cookieStore = cookies();
    const authValue = cookieStore.get('pb_auth');
    const pbserver = getPocketBaseFromAuthCookie(authValue)
     const url = `https://fashion.verixr.com/checkout/payment?userid=${pbserver?.authStore?.model?.id}&collid=${pbserver?.authStore?.model?.collectionId}`;
    if (pbserver && pbserver?.authStore?.isValid) {
        const results = await mpesaPay.stkPush(data.amount, data.phonenumber, url).catch(err => {
            if (err) {
                throw new APIError({ msg: "Payment was not initiated" });
            }
        })
        revalidatePath("/checkout")
        if (results && results.ResponseCode == 0) {
            return { message: "Please check your phone to complete payment" }
        } else {
            return { error: "An error occured, please try again later!" }
        }

    } else {
        return { error: "Please login to proceed" }
    }
}