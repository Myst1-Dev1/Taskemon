'use client';

import { NavBar } from "@/components/navBar";
import Image from "next/image";
import { useState } from "react";
import { AwardModal } from "./awardModal";
import { Award } from "@/@types/Award";
import { FaTrashAlt } from "react-icons/fa";
import { deleteAward } from "@/actions/awardActions";
import { useRouter } from "next/navigation";
import { HistoryEntry } from "@/@types/History";
import { ProfileInfo } from "../profileInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "react-toastify";

interface AwardsContentProps {
    user:any;
}

export function AwardsContent({ user }:AwardsContentProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const router = useRouter();
    
    async function redeemAward(userId:string, awardId:string) {
        try {
        const res = await fetch("https://lab.mystdev.com.br/taskemon/user/redeemAward", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, awardId }),
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message || 'Erro desconhecido ao resgatar a recompensa!');
            return;
        } else {
            toast.success('Recompensa resgatada com sucesso!');
        }
        } catch (error) {
        console.log('Tivemos um erro ao resgatar a recompensa!', error);
        }

        router.refresh();
    }

    async function handleDeleteAward(id:string) {
        try {
            await deleteAward(id);
            toast.success('Recompensa deletada com sucesso!');
        } catch (error) {
            toast.error('Tivemos um erro ao deletar a recompensa!');
        }
    }

    useGSAP(() => {
        gsap.fromTo('.awardBtn', { opacity:0, scale:0, x:-40 }, { opacity:1, scale:1, x:0, stagger:0.4, delay:0.2, duration:0.8 });
    }, []);

    useGSAP(() => {
        gsap.fromTo('.award', { opacity:0, y:60 }, { opacity:1, y:0, stagger:0.4, delay:0.2, duration:0.8 });
    }, [user]);
    
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
                    <ProfileInfo user={user} />
    
                    <div className="z-10 mt-5 flex flex-col gap-4 h-[500px] overflow-y-scroll scrollDontShow">
                        {user.awards.map((award: Award) => {
                            const today = new Date().toLocaleDateString('pt-BR');

                            const isAwardRedeemedToday = user?.history?.some((entry: HistoryEntry) =>
                                entry.actionType === 'award_redeemed' &&
                                entry.referenceId?._id?.toString() === award._id.toString() &&
                                new Date(entry.date).toLocaleDateString('pt-BR') === today
                            );

                            return (
                                <div key={award._id} className="award relative w-full p-3 bg-[#FFFFFF4A] rounded-md flex items-center gap-5">
                                    <Image
                                        className="w-10 h-10 object-cover rounded-full"
                                        src={award.awardImg || "/images/joystick.png"}
                                        width={100}
                                        height={100}
                                        alt="foto que representa o prêmio"
                                    />
                                    <div className="w-full flex flex-col gap-4">
                                        <h3>{award.awardTitle}</h3>
                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={() => {
                                                    if (!isAwardRedeemedToday) redeemAward(user?._id, award._id);
                                                }}
                                                className={`z-10 rounded-full w-fit px-2 py-1 text-white transition-all duration-500 
                                                    ${isAwardRedeemedToday ? "bg-green-500 opacity-50 cursor-not-allowed" : "bg-green-500 cursor-pointer hover:opacity-50"}`}
                                            >
                                                Resgatar prêmio
                                            </button>
                                            <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">
                                                {award.awardPoints} pontos
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => handleDeleteAward(award._id)}
                                        className="w-7 h-7 grid place-content-center bg-red-200 text-red-500 rounded-md absolute top-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50"
                                    >
                                        <FaTrashAlt />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-8 grid place-content-center">
                        <button onClick={() => setIsOpenModal(true)} className="awardBtn cursor-pointer z-10 w-48 rounded-md cursor-pointeer p-3 bg-blue-400 text-white transition-all duration-500 hover:opacity-80">Adicionar Prêmios</button>
                    </div>
                </div>
            </div>
            <NavBar />
            <AwardModal isOpenModal = {isOpenModal} setIsOpenModal = {setIsOpenModal} user = {user} />
        </>
    )
}