'use server'

import 'server-only'
import { cookies } from 'next/headers'

export async function setToken(token) {

    // The expiration date is 5 minutes before google expires the token
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + ((token.expires_in * 1000) - (1000 * 60 * 5)))
    expiresAt.toUTCString()
    
    const cookieStore = await cookies()

    cookieStore.set('token', token.access_token,{
        name: 'token',
        value: token.access_token,
        expires: expiresAt,
        sameSite: 'strict',
        path: '/',
    })
}

export async function getToken() {

    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}