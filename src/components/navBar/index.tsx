'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { FaHome, FaMedal, FaSignOutAlt, FaUserClock } from "react-icons/fa";

export function NavBar() {
    const router = useRouter()

    async function handleSignUp() {
        destroyCookie(null, 'user-token')

        router.push('/');
    }

    useGSAP(() => {
        gsap.fromTo('.navItem', { scale:0, opacity:0 }, { scale:1, opacity:1, ease:'elastic.in', stagger:0.4, duration:0.8  });
    }, []);

    return (
        <>
            <nav className="z-20 flex justify-between items-center fixed bottom-0 right-0 left-0 rounded-tr-[24px] rounded-tl-[24px] bg-white">
                <Link href="/panel" className="grow navItem p-3 flex flex-col gap-3 justify-center items-center font-normal transition-all duration-500 hover:bg-red-500">
                    <FaHome />
                    Home
                </Link>
                <Link href="/awards" className="grow navItem p-3 flex flex-col gap-3 justify-center items-center font-normal transition-all duration-500 hover:bg-red-500">
                    <FaMedal />
                    Prêmios
                </Link>
                <Link href="/historic" className="grow navItem p-3 flex flex-col gap-3 justify-center items-center font-normal transition-all duration-500 hover:bg-red-500">
                    <FaUserClock />
                    Histórico
                </Link>
                <div onClick={handleSignUp} className="grow navItem cursor-pointer p-3 flex flex-col gap-3 justify-center items-center font-normal transition-all duration-500 hover:bg-red-500">
                    <FaSignOutAlt />
                    Sair
                </div>
            </nav>
        </>
    )
}