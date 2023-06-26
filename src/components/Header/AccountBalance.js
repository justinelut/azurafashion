import { pb } from "@/app/pocketbase";
import { useEffect, useState } from "react";

export function useAccountBalance() {
    const [accountBalance, setAccountBalance] = useState(0);

    const calculateAccountBalance = (paymentRecords) => {
        const totalAmount = paymentRecords.reduce((total, item) => total + item.amount, 0);
        return totalAmount;
    };

    useEffect(() => {
        const getInitialAccountBalance = async () => {
            const payments = await retrievePayments();
            const calculatedAccountBalance = calculateAccountBalance(payments);
            setAccountBalance(calculatedAccountBalance);
        };

        getInitialAccountBalance();
    }, [pb.authStore.model]);

    useEffect(() => {
        const setupSubscription = async () => {
            // Subscribe to changes in any fashion_payments record
            const subscription = await pb.collection("fashion_payments").subscribe("*", async function (e) {
                const payments = await retrievePayments();
                const calculatedAccountBalance = calculateAccountBalance(payments);
                setAccountBalance(calculatedAccountBalance);
            });

            // Clean up the subscription when the component unmounts
            return () => {
                subscription.unsubscribe();
            };
        };

        setupSubscription();
    }, []);

    const retrievePayments = async () => {
        const payments = await pb.collection("fashion_payments").getFullList();
        return payments;
    };

    return accountBalance;
}
