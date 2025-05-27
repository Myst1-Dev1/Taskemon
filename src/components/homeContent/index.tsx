'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { setCookie } from "nookies";
import { Loading } from "../loading";

const avatars = [
    "/images/avatar.png",
    "/images/avatar2.webp",
    "/images/avatar3.webp",
    "/images/avatar4.webp",
    "/images/avatar5.webp",
    "/images/avatar6.webp",
    "/images/avatar7.jpg",
    "/images/avatar8.webp",
    "/images/avatar9.webp",
]

export function HomeContent() {
    const [formType, setFormType] = useState('signIn');
    const [avatar, setAvatar] = useState('/images/avatar-default.jpg');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    function handleGenerateRandomAvatar(e:FormEvent) {
        e.preventDefault();
        const random = avatars[Math.floor(Math.random() * avatars.length)];
        setAvatar(random);
    }

    async function handleLoginWithUserName(e:FormEvent) {
        e.preventDefault();
        setLoading(true);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get("username");

        if (!username || typeof username !== "string") {
            alert("Por favor, insira um nome de usuário.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/user/findUser/${encodeURIComponent(username)}`);
    
            if (!response.ok) {
            alert("Usuário não encontrado.");
            return;
            }

            const userData = await response.json();

            setCookie(undefined, 'user-token', JSON.stringify(userData), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });

            router.push("/panel");

            console.log("Usuário encontrado:", userData);
        } catch (error) {
            console.log('Tivemos um erro ao fazer o login', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="py-8 min-h-screen flex justify-center items-center flex-col gap-3">
                <Image className="object-cover w-52 opacity-10" src="/images/mario-theme.png" width={500} height={500} alt="foto representando o tema do mario" />
                <div className="flex flex-col gap-4">
                    <Image className="w-full object-cover" src="/images/logo.png" width={200} height={200} alt="logo do aplicativo" />
                    {formType === 'signIn' &&
                        <form onSubmit={handleLoginWithUserName} className="-mt-5 max-w-64 w-full flex flex-col">
                            <input type="text" name="username" className="bg-white border-0 rounded-lg w-full outline-none p-3" placeholder="Nome de usuário" />
                            <button className="rounded-lg w-full p-3 text-white bg-blue-500 mt-5 cursor-pointer transition-all duration-500 hover:opacity-80">
                                {loading ? <Loading /> : 'Começar'}
                            </button>
                            <p className="text-sm mt-3 text-center font-normal">Não possui uma conta? <span onClick={() => { setFormType('signUp'); setAvatar('/images/avatar-default.jpg') }} className="text-blue-500 cursor-pointer">Criar conta</span></p>
                        </form>
                    }

                    {formType === 'signUp' &&
                        <form action="" className="-mt-5 max-w-64 w-full flex gap-4 justify-center items-center flex-col">
                            <Image className="object-cover rounded-full aspect-square w-20 h-20" src={avatar} width={100} height={100} alt="foto de usuário" />
                            <button onClick={handleGenerateRandomAvatar} className="bg-blue-400 text-white max-w-32 w-full p-3 rounded-full mt-3 cursor-pointer">Gerar avatar</button>
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