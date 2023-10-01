import { NextResponse } from 'next/server';
import { pb } from '@/app/pocketbase';


export async function middleware(req) {
    // load the store data from the request cookie string
    const response = NextResponse.next()
    const authCookie = req.cookies.get('pb_auth')
    if (!authCookie || authCookie === undefined) pb.authStore.clear()
    else {
        pb.authStore.loadFromCookie(`pb_auth=${authCookie?.value}`)
        pb.authStore.onChange(() => {
            response?.headers.set('pb_auth', req.cookies.get('pb_auth').value);
        });
    }
     
    if (pb.authStore && !pb.authStore.isValid && req.nextUrl.pathname.startsWith("/dashboard")) {
        pb.authStore.clear()
        return NextResponse.redirect(
            new URL(`?${new URLSearchParams({ error: "/dashboard" })}`, req.url)
        );
    }
    return response;
}