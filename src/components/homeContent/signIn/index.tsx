import { Loading } from "@/components/loading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface SignInProps {
    formType: string;
    setFormType:Dispatch<SetStateAction<string>>;
    setAvatar:Dispatch<SetStateAction<string>>;
}

export function SignIn({ formType, setFormType, setAvatar }:SignInProps) {
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
                maxAge: 10 * 365 * 24 * 60 * 60, // 10 anos em segundos
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

    useGSAP(() => {
        const tl = gsap.timeline({defaults: { ease:'sine', stagger:0.3, duration:0.4 }});

        tl.fromTo('.signInInput', { opacity:0, y:-30 }, { opacity:1, y:0 });
        tl.fromTo('.signInButton', { opacity:0, y:30 }, { opacity:1, y:0 });
    }, [formType]);

    return (
        <>
            <form onSubmit={handleLoginWithUserName} className="-mt-5 max-w-64 w-full flex flex-col">
                <input type="text" name="username" className="signInInput bg-white border-0 rounded-lg w-full outline-none p-3" placeholder="Nome de usuário" />
                <button className="signInButton rounded-lg w-full p-3 text-white bg-blue-500 mt-5 cursor-pointer transition-all duration-500 hover:opacity-80">
                    {loading ? <Loading /> : 'Começar'}
                </button>
                <p className="text-sm mt-3 text-center font-normal">Não possui uma conta? <span onClick={() => { setFormType('signUp'); setAvatar('/images/avatar-default.jpg') }} className="text-blue-500 cursor-pointer">Criar conta</span></p>
            </form>
        </>
    )
}