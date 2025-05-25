'use client';

import Image from "next/image";
import { useState } from "react";

export function HomeContent() {
    const [formType, setFormType] = useState('signUp');

    return (
        <>
            <div className="py-8 min-h-screen flex justify-center items-center flex-col gap-3">
                <Image className="object-cover w-52 opacity-10" src="/images/mario-theme.png" width={500} height={500} alt="foto representando o tema do mario" />
                <div className="flex flex-col gap-4">
                    <Image className="w-full object-cover" src="/images/logo.png" width={200} height={200} alt="logo do aplicativo" />
                    {formType === 'signIn' &&
                        <form action="" className="-mt-5 max-w-64 w-full flex flex-col">
                            <input type="text" className="bg-white border-0 rounded-lg w-full outline-none p-3" placeholder="Nome de usuário" />
                            <button className="rounded-lg w-full p-3 text-white bg-blue-500 mt-5 cursor-pointer transition-all duration-500 hover:opacity-80">Começar</button>
                            <p className="text-sm mt-3 text-center font-normal">Não possui uma conta? <span onClick={() => setFormType('signUp')} className="text-blue-500 cursor-pointer">Criar conta</span></p>
                        </form>
                    }

                    {formType === 'signUp' &&
                        <form action="" className="-mt-5 max-w-64 w-full flex gap-4 justify-center items-center flex-col">
                            <Image className="object-cover rounded-full aspect-square w-20 h-20" src="/images/avatar.png" width={100} height={100} alt="foto de usuário" />
                            <button className="bg-blue-400 text-white max-w-32 w-full p-3 rounded-full mt-3 cursor-pointer">Gerar avatar</button>
                            <input type="text" className="mt-4 bg-white border-0 rounded-lg w-full outline-none p-3" placeholder="Nome de usuário" />
                            <button className="rounded-lg w-full p-3 text-white bg-blue-500 cursor-pointer transition-all duration-500 hover:opacity-80">Criar conta</button>
                            <p className="text-sm text-center font-normal">Já possui uma conta? <span onClick={() => setFormType('signIn')} className="text-blue-500 cursor-pointer">Entrar</span></p>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}