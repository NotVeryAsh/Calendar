import {getToken} from "@/app/lib/auth";

export default async function sendRequest(url, method="GET",  body, cacheTime) {

    const isExternalUrl = url.split("/")[0].includes("http")

    url = isExternalUrl ? url : `${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API}${url}`

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    const token = await getToken()
    if(token) {
        headers['Authorization'] = token
    }

    return await fetch(url, {
        method,
        headers: headers,
        body: body && JSON.stringify(body),
        next: {
            revalidate: cacheTime,
        },
        credentials: 'include',
    });
}