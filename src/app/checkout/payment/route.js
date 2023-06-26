import { pb } from '@/app/pocketbase';
import { NextResponse } from 'next/server'

export async function POST(request) {
    const { searchParams } = new URL(request.url)
    const userid = searchParams.get('userid')
    const collectionid = searchParams.get('collid')
    const data = await request.json()
    const resultscode = data.Body.stkCallback.ResultCode

    if (data && resultscode == 0) {
        function extractData() {
            const { Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber } = data.Body.stkCallback.CallbackMetadata.Item.reduce((acc, item) => {
                acc[item.Name] = item.Value;
                return acc;
            }, {});

            return { amount: Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber };
        }       
        const paymentinfo = extractData(data);
        try {
            await pb.collection('fashion_payments').create({
                "collectionId": collectionid,
                "amount": paymentinfo.amount,
                "MpesaReceiptNumber": paymentinfo.MpesaReceiptNumber,
                "PhoneNumber": paymentinfo.PhoneNumber,
                "createdby": userid
            })
        } catch (err) {
            return err
        }
    } else {
        if (data && resultscode == 17) {
            await pb.collection('payment_logs').create({
                "message": "Mpesa was unable to process your request, please try again later",
                "createdby": userid
            })
        } else {
            await pb.collection('payment_logs').create({
                "message": "You have cancelled the transaction or payment has failed",
                "createdby": userid
            })
        }
    }
    return NextResponse.json({ Message: "Success" })
}



