"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import sendRequest from "@/app/lib/request";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {clearSession} from "@/app/lib/session";

const onClickGoogleLogin = async (setErrorMessage) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;

    const response = await sendRequest(`/api/auth-url?redirect_url=${baseUrl}/login`, "GET");

    if(response.status !== 200) {
        setErrorMessage('Could not log you in with Google');
        return;
    }

    const json = await response.json();

    redirect(json.url);
}

export default function Home() {

    useEffect(() => {
        setErrorMessage(sessionStorage.getItem('error'));
        clearSession()
    }, []);
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(false)
    
    return (
        <div className={"flex flex-col p-2 h-screen justify-between py-20"}>
            <h1 className={"text-center font-semibold text-5xl text-sky-700"}>Calendar</h1>
            {/* TODO Make this flash a box with an error in it */}
            {errorMessage && (
                errorMessage
            )}
            {/* If endpoint fails, un-disable button */}
            <button 
                onClick={() => {onClickGoogleLogin(setErrorMessage); setLoginButtonDisabled(true)}}
                className={"bg-blue-500 px-2 py-4 text-white font-semibold rounded-xl my-auto text-lg mx-5 drop-shadow-lg disabled:bg-blue-500 disabled:opacity-75"}
                disabled={loginButtonDisabled}
            >
                Sign in with Google <FontAwesomeIcon icon={faGoogle} className={"ml-1"} />
            </button>
            <div>&nbsp;</div>
        </div>
    );
}