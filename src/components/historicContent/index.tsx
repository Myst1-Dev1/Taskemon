'use client';

import { HistoryEntry } from "@/@types/History";
import { NavBar } from "@/components/navBar";
import { ProfileInfo } from "@/components/profileInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { FaGift } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";

interface HistoricContentProps {
    user:any;
}

type GroupedHistory = Record<string, HistoryEntry[]>;

export function HistoricContent({user}:HistoricContentProps) {

    const groupedHistory: GroupedHistory = user?.history.reduce((acc:any, item:any) => {
    const dateKey = new Date(item.date).toLocaleDateString('pt-BR');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
    }, {} as GroupedHistory);

    useGSAP(() => {
        const tl = gsap.timeline({defaults: { ease:'sine', stagger:0.4, delay:0.2, duration:0.8 }});
        tl.fromTo('.historicBox', { opacity:0, y:60, scale:0 }, { opacity:1, y:0, scale:1 });
        tl.fromTo('.historicContent', { opacity:0, x:-30 }, { opacity:1, x:0 });
    }, []);

    return (
        <>
            <div className="relative w-full min-h-screen">
                <div className="absolute inset-0 z-0">
                    <Image
                    width={500}
                    height={500}
                    src="/images/hidden-bg.gif"
                    alt="Fundo"
                    className="w-full h-full object-cover opacity-10"
                    />
                </div>
    
                <div className="z-10 py-16 px-4">
                   <ProfileInfo user={user} />
                    <div className="z-10 mt-5 flex flex-col gap-4 h-[600px] overflow-y-scroll scrollDontShow">
                        {user?.history.length === 0 ? (
                            <p className="text-center mt-5 text-red-800 font-bold">
                            Você ainda não tem tarefas feitas ou recompensas resgatadas em seu histórico
                            </p>
                        ) : (
                            Object.entries(groupedHistory).map(([date, entries]) => (
                            <div
                                key={date}
                                className="historicBox bg-[#FFFFFF4A] rounded-md shadow p-3"
                            >
                                <h4 className="text-sm font-bold text-gray-700 border-b border-black/10 pb-1 mb-2">
                                {date}
                                </h4>
                                {entries.map((story: any) => (
                                <div
                                    key={story._id}
                                    className="historicContent py-2 px-1 flex justify-between items-center border-b border-black/10 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                    <div
                                        className={`w-7 h-7 rounded-full grid place-content-center ${
                                        story.referenceModel === 'Tasks'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-200 text-red-500'
                                        }`}
                                    >
                                        {story.referenceModel === 'Tasks' ? <FaClipboardList /> : <FaGift />}
                                    </div>
                                    <h5 className="font-semibold max-w-64 text-sm">
                                        {story.referenceId?.title || story.referenceId?.awardTitle}
                                    </h5>
                                    </div>
                                    <span className="text-gray-500 font-normal text-xs mb-auto">
                                    {new Date(story.date).toLocaleTimeString('pt-BR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    </span>
                                </div>
                                ))}
                            </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}