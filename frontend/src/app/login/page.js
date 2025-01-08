"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import {redirect, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import sendRequest from "@/app/lib/request";
import {setToken} from "@/app/lib/auth";
import {setErrorMessage} from "@/app/lib/session";

const getGoogleAuthCode = async (code, scope) => {
    const response = await sendRequest(`/api/auth-code?code=${code}&scope=${scope}`, "GET");

    if(response.status !== 200) {
        await setErrorMessage('Could not log you in with Google')
        redirect('/')
    }

    const json = await response.json();

    const token = json.token;
    await setToken(token)

    redirect("/calendar");
}

export default function Login() {

    const searchParams = useSearchParams()

    useEffect(() => {
        getGoogleAuthCode(searchParams.get('code'), searchParams.get('scope'))
    }, [ searchParams])

    return (
        <div className={"flex flex-col p-2 h-screen"}>
            <div className={"flex flex-col text-center font-semibold rounded-xl my-auto mx-5 drop-shadow-lg space-y-5 text-3xl"}>
                <span>
                    Waiting...
                </span>
                <FontAwesomeIcon icon={faSpinner} className={"spinner"}/>
            </div>
        </div>
    );
}