import { NavBar } from "@/components/navBar";
import Image from "next/image";
import { FaCheck, FaGift } from "react-icons/fa";


export default function Historic() {
    return (
        <>
            <div className="relative w-full min-h-screen">
                <div className="absolute inset-0 z-0">
                    <Image
                    width={500}
                    height={500}
                    src="/images/hidden-bg.jpg"
                    alt="Fundo"
                    className="w-full h-full object-cover opacity-10"
                    />
                </div>
    
                <div className="z-10 py-16 px-4">
                    <div className="flex flex-col justify-center items-center">
                        <Image className="w-20 h-20 object-cover rounded-full aspect-square" src="/images/avatar.png" width={100} height={100} alt="avatar do usuário" />
                        <h2 className="mt-1 text-xl font-bold">John Doe</h2>
                        <span className="mt-4 rounded-full px-3 py-1 bg-yellow-300">25 pontos</span>
                    </div>
    
                    <div className="z-10 mt-5 flex flex-col gap-2 h-[600px] bg-[#FFFFFF4A] rounded-md w-full overflow-y-scroll scrollDontShow">
                        <div className="p-3 flex justify-between items-center border-b border-black/10">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full grid place-content-center bg-green-500 text-white">
                                    <FaCheck />
                                </div>
                                <h5 className="font-semibold max-w-64">Dormiu sem acordar</h5>
                            </div>
                            <span className="text-gray-500 font-normal text-xs mb-auto">15/05/2025</span>
                        </div>
                        <div className="p-3 flex justify-between items-center border-b border-black/10">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full grid place-content-center bg-red-200 text-red-500">
                                    <FaGift />
                                </div>
                                <h5 className="font-semibold max-w-64">30 Minutos a mais de gameplay</h5>
                            </div>
                            <span className="text-gray-500 font-normal text-xs mb-auto">15/05/2025</span>
                        </div>
                        <div className="p-3 flex justify-between items-center border-b border-black/10">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full grid place-content-center bg-green-500 text-white">
                                    <FaCheck />
                                </div>
                                <h5 className="font-semibold max-w-64">Dormiu sem acordar</h5>
                            </div>
                            <span className="text-gray-500 font-normal text-xs mb-auto">15/05/2025</span>
                        </div>
                        <div className="p-3 flex justify-between items-center border-b border-black/10">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full grid place-content-center bg-red-200 text-red-500">
                                    <FaGift />
                                </div>
                                <h5 className="font-semibold max-w-64">30 Minutos a mais de gameplay</h5>
                            </div>
                            <span className="text-gray-500 font-normal text-xs mb-auto">15/05/2025</span>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}