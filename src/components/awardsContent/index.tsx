'use client';

import { NavBar } from "@/components/navBar";
import Image from "next/image";
import { useState } from "react";
import { AwardModal } from "./awardModal";
import { Award } from "@/@types/Award";
import { FaTrashAlt } from "react-icons/fa";
import { deleteAward } from "@/actions/awardActions";
import { useRouter } from "next/navigation";

interface AwardsContentProps {
    user:any;
}

export function AwardsContent({ user }:AwardsContentProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const router = useRouter();
    
    async function redeemAward(userId:string, awardId:string) {
        try {
        const res = await fetch("http://localhost:4000/user/redeemAward", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, awardId }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Erro desconhecido ao resgatar a recompensa.');
            return;
        }
        } catch (error) {
        console.log('Tivemos um erro ao resgatar a recompensa!', error);
        }

        router.refresh();
    }
    
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
                        <Image className="w-20 h-20 object-cover rounded-full aspect-square" src={user?.avatar || "/images/avatar.png"} width={100} height={100} alt="avatar do usuário" />
                        <h2 className="mt-1 text-xl font-bold">{user?.name}</h2>
                        <span className="mt-4 rounded-full px-3 py-1 bg-yellow-300">{user?.points} pontos</span>
                    </div>
    
                    <div className="z-10 mt-5 flex flex-col gap-4 h-[500px] overflow-y-scroll scrollDontShow">
                        {user.awards.map((award:Award) => (
                            <div key={award._id} className="relative w-full p-3 bg-[#FFFFFF4A] rounded-md flex items-center gap-5">
                                <Image className="w-10 h-10 object-cover rounded-full" src={award.awardImg || "/images/joystick.png"} width={100} height={100} alt="foto que representa o prêmio" />
                                <div className="w-full flex flex-col gap-4">
                                    <h3>{award.awardTitle}</h3>
                                    <div className="flex justify-between items-center">
                                        <button onClick={() => redeemAward(user?._id, award._id)} className="z-10 cursor-pointer rounded-full w-fit px-2 py-1 text-white bg-green-500 transition-all duration-500 hover:opacity-50">Resgatar prêmio</button>
                                        <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">{award.awardPoints} pontos</span>
                                    </div>
                                </div>
                                <div onClick={() => deleteAward(award._id)} className="w-7 h-7 grid place-content-center bg-red-200 text-red-500 rounded-md absolute top-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                    <FaTrashAlt />
                                </div>
                            </div>
                        ))}
                        
                    </div>
                    <div className="mt-8 grid place-content-center">
                        <button onClick={() => setIsOpenModal(true)} className="cursor-pointer z-10 w-48 rounded-md cursor-pointeer p-3 bg-blue-400 text-white transition-all duration-500 hover:opacity-80">Adicionar Prêmios</button>
                    </div>
                </div>
            </div>
            <NavBar />
            <AwardModal isOpenModal = {isOpenModal} setIsOpenModal = {setIsOpenModal} user = {user} />
        </>
    )
}