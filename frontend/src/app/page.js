"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import sendRequest from "@/app/lib/request";
import {redirect} from "next/navigation";

const onClickGoogleLogin = async () => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;

    const response = await sendRequest(`/api/auth-url?redirect_url=${baseUrl}/login`, "GET");

    if(response.status !== 200) {
        throw new Error('Failed to login with Google');
    }

    const json = await response.json();

    redirect(json.url);
}

export default function Home() {
    return (
        <div className={"flex flex-col p-2 h-screen justify-between py-20"}>
            <h1 className={"text-center font-semibold text-5xl text-sky-700"}>Calendar</h1>
            <button onClick={onClickGoogleLogin} className={"bg-blue-500 px-2 py-4 text-white font-semibold rounded-xl my-auto text-lg mx-5 drop-shadow-lg"}>
                Sign in with Google <FontAwesomeIcon icon={faGoogle} className={"ml-1"} />
            </button>
            <div>&nbsp;</div>
        </div>
    );
}