import { Loading } from "@/components/loading";
import { useEdgeStore } from "@/lib/edgestore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

interface SignUpProps {
    avatar:string;
    setAvatar:Dispatch<SetStateAction<string>>;
    formType:string;
    setFormType:Dispatch<SetStateAction<string>>;
}

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

export function SignUp({ avatar, setAvatar, formType, setFormType }:SignUpProps) {
    const [loading, setLoading] = useState(false);

    const { edgestore } = useEdgeStore();

    const avatarImg = useRef<HTMLImageElement>(null);

    function handleGenerateRandomAvatar(e: FormEvent) {
        e.preventDefault();

        const tl = gsap.timeline();
        const totalSteps = 10;

        tl.to({}, {
            duration: totalSteps * 0.01,
            onUpdate: () => {
                const index = Math.floor(Math.random() * avatars.length);
                if (avatarImg.current) {
                    avatarImg.current.src = avatars[index];
                }
            },
            onComplete: () => {
                const finalAvatar = avatars[Math.floor(Math.random() * avatars.length)];
                if (avatarImg.current) {
                    avatarImg.current.src = finalAvatar;
                }
                setAvatar(finalAvatar);
            }
        });
    }

    async function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("name");

        setLoading(true);

        try {
            const imageResponse = await fetch(avatar);
            const imageBlob = await imageResponse.blob();
            const file = new File([imageBlob], 'avatar.png', { type: imageBlob.type });

            const { url } = await edgestore.myPublicImages.upload({ file });

            await fetch('http://localhost:4000/user/createUser', {
                    method: 'POST',
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    avatar: url,
                    name
                })
            });

            alert('Usuário criado com sucesso!');
        } catch (error) {
            console.error('Falha ao criar um novo usuário!', error);
            return;
        } finally {
            setLoading(false);
            setFormType('signIn');
        }
    }

     useGSAP(() => {
            const tl = gsap.timeline({defaults: { ease:'sine', stagger:0.3, duration:0.4 }});
    
            tl.fromTo('.avatarImg', { opacity:0, bottom:-30 } , { opacity:1, bottom:0 });
            tl.fromTo('.avatarBtn', { opacity:0, left:-30 } , { opacity:1, left:0 });
            tl.fromTo('.signUpInput', { opacity:0, y:-30 }, { opacity:1, y:0 });
            tl.fromTo('.signUpButton', { opacity:0, y:30 }, { opacity:1, y:0 });
    }, [formType]);

    return (
        <>
            <form onSubmit={handleCreateUser} className="-mt-5 max-w-64 w-full flex gap-4 justify-center items-center flex-col">
                <img ref={avatarImg} className="avatarImg object-cover rounded-full aspect-square w-20 h-20" src={avatar} width={100} height={100} alt="foto de usuário" />
                <button type="button" onClick={handleGenerateRandomAvatar} className="avatarBtn bg-blue-400 text-white max-w-32 w-full p-3 rounded-full mt-3 cursor-pointer">Gerar avatar</button>
                <input type="text" name="name" className="signUpInput mt-4 bg-white border-0 rounded-lg w-full outline-none p-3" placeholder="Nome de usuário" />
                <button type="submit" className="signUpButton rounded-lg w-full p-3 text-white bg-blue-500 cursor-pointer transition-all duration-500 hover:opacity-80">
                    {loading ? <Loading /> : 'Criar conta'}
                </button>
                <p className="text-sm text-center font-normal">Já possui uma conta? <span onClick={() => setFormType('signIn')} className="text-blue-500 cursor-pointer">Entrar</span></p>
            </form>
        </>
    )
}