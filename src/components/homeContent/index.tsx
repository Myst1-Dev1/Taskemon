'use client';

import Image from "next/image";
import { useState } from "react";
import { SignIn } from "./signIn";
import { SignUp } from "./signUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function HomeContent() {
    const [formType, setFormType] = useState('signIn');
    const [avatar, setAvatar] = useState('/images/avatar-default.jpg');

    useGSAP(() => {
        const tl = gsap.timeline({defaults: { ease:'sine', stagger:0.3, duration:0.8 }});
        tl.fromTo('.marioImg', { opacity:0, y:40 }, { opacity:0.1, y:0 });
        tl.fromTo('.logo', { opacity:0, scale:0 }, { opacity:1, scale:1.1 });
    }, []);

    return (
        <>
            <div className="py-8 min-h-screen flex justify-center items-center flex-col gap-3">
                <Image className="marioImg object-cover w-52 opacity-10" src="/images/mario-theme.png" width={500} height={500} alt="foto representando o tema do mario" />
                <div className="flex flex-col gap-4">
                    <Image className="logo w-full object-cover" src="/images/logo.png" width={200} height={200} alt="logo do aplicativo" />
                    {formType === 'signIn' &&
                        <SignIn formType = {formType} setFormType = {setFormType} setAvatar={setAvatar} />
                    }

                    {formType === 'signUp' &&
                        <SignUp avatar = {avatar} setAvatar = {setAvatar} formType = {formType} setFormType = {setFormType} />
                    }
                </div>
            </div>
        </>
    )
}