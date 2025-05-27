import Link from "next/link";
import { FaHome, FaMedal, FaSignOutAlt, FaUserClock } from "react-icons/fa";

export function NavBar() {
    return (
        <>
            <nav className="z-20 flex justify-between items-center fixed bottom-0 right-0 left-0 rounded-tr-[24px] rounded-tl-[24px] bg-white">
                <Link href="/panel" className="p-3 flex flex-col gap-3 justify-center items-center font-normal transition-all duration-500 hover:bg-red-500">
                    <FaHome />
                    Home
                </Link>
                <Link href="/awards" className="p-3 flex flex-col gap-3 justify-center items-center font-normal transition-all duration-500 hover:bg-red-500">
                    <FaMedal />
                    Prêmios
                </Link>
                <Link href="/historic" className="p-3 flex flex-col gap-3 justify-center items-center font-normal transition-all duration-500 hover:bg-red-500">
                    <FaUserClock />
                    Histórico
                </Link>
                <div className="cursor-pointer p-3 flex flex-col gap-3 justify-center items-center font-normal transition-all duration-500 hover:bg-red-500">
                    <FaSignOutAlt />
                    Sair
                </div>
            </nav>
        </>
    )
}