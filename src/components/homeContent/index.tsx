'use client';

import Image from "next/image";
import { useState } from "react";
import { SignIn } from "./signIn";
import { SignUp } from "./signUp";

export function HomeContent() {
    const [formType, setFormType] = useState('signIn');
    const [avatar, setAvatar] = useState('/images/avatar-default.jpg');

    return (
        <>
            <div className="py-8 min-h-screen flex justify-center items-center flex-col gap-3">
                <Image className="object-cover w-52 opacity-10" src="/images/mario-theme.png" width={500} height={500} alt="foto representando o tema do mario" />
                <div className="flex flex-col gap-4">
                    <Image className="w-full object-cover" src="/images/logo.png" width={200} height={200} alt="logo do aplicativo" />
                    {formType === 'signIn' &&
                        <SignIn setFormType = {setFormType} setAvatar={setAvatar} />
                    }

                    {formType === 'signUp' &&
                        <SignUp avatar = {avatar} setAvatar = {setAvatar} setFormType = {setFormType} />
                    }
                </div>
            </div>
        </>
    )
}