'use server'

import 'server-only'
import { cookies } from 'next/headers'

export async function setToken(token) {

    // The expiration date is 5 minutes before google expires the token
    const expiresAt = new Date(Date.now() + (token.expires_in - (60 * 5)))
    const cookieStore = await cookies()

    cookieStore.set('token', token.access_token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function getToken() {

    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}