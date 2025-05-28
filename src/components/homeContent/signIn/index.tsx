import { Loading } from "@/components/loading";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { FormEvent, useState } from "react";

interface SignInProps {
    setFormType:any;
    setAvatar:any;
}

export function SignIn({ setFormType, setAvatar }:SignInProps) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

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
            <form onSubmit={handleLoginWithUserName} className="-mt-5 max-w-64 w-full flex flex-col">
                <input type="text" name="username" className="bg-white border-0 rounded-lg w-full outline-none p-3" placeholder="Nome de usuário" />
                <button className="rounded-lg w-full p-3 text-white bg-blue-500 mt-5 cursor-pointer transition-all duration-500 hover:opacity-80">
                    {loading ? <Loading /> : 'Começar'}
                </button>
                <p className="text-sm mt-3 text-center font-normal">Não possui uma conta? <span onClick={() => { setFormType('signUp'); setAvatar('/images/avatar-default.jpg') }} className="text-blue-500 cursor-pointer">Criar conta</span></p>
            </form>
        </>
    )
}