"use client"
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import React, { useEffect, useMemo, useState, useCallback, createContext, useContext } from "react";


const PocketContext = createContext();

export function usePocketbase() {
    const context = useContext(PocketContext);
    if (!context) {
        throw new Error("usePocketbase must be used within a PocketProvider");
    }
    return context;
}

export function PocketProvider({ children }) {
    const pb = useMemo(() => new PocketBase("https://api.verixr.com"), ["https://api.verixr.com"]);
    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);
    const [error, setError] = useState(null);
    const router = useRouter()

    useEffect(() => {
        const handleAuthStoreChange = async (token, model) => {
            setToken(token);
            setUser(model);
             document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
             pb.authStore.exportToCookie({ httpOnly: false })
        };

        const authenticate = async () => {
            try {
                // Get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
                pb.authStore.isValid && (await pb.collection('users').authRefresh());
            } catch (_) {
                // Clear the auth store on failed refresh
                pb.authStore.clear();
            }
        };

        authenticate();

        return pb.authStore.onChange(handleAuthStoreChange);
    }, []);

    const handleRequestError = useCallback((error) => {
        setError(error);
        throw error;
    }, []);

    const login = useCallback(
        async (email, password) => {
            try {
                const response = await pb.collection("users").authWithPassword(
                    email,
                    password
                );
                document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
                pb.authStore.exportToCookie({ httpOnly: false })
                router.refresh()
                return { response, error: null };
            } catch (error) {
                handleRequestError(error);
                return { response: null, error };
            }
        },
        [pb, handleRequestError]
    );

    const loginWithGoogle = useCallback(
        async () => {
            try {
                const response = await pb.collection('users').authWithOAuth2({ provider: 'google' });
                document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
                pb.authStore.exportToCookie({ httpOnly: false })
                router.refresh()
                return { response, error: null };
            } catch (error) {
                handleRequestError(error);
                return { response: null, error };
            }
        },
        [pb, handleRequestError]
    );

    const logout = useCallback(() => {
        pb.authStore.clear();
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
        pb.authStore.exportToCookie({ httpOnly: false })
        router.refresh()
    }, [pb]);

    const value = {
        pb,
        token,
        user,
        error,
        login,
        logout,
        loginWithGoogle
    };

    return (
        <PocketContext.Provider value={value}>
            {children}
        </PocketContext.Provider>
    );
}
