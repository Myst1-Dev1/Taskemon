'use client';

import { NavBar } from "@/components/navBar";
import Image from "next/image";
import { useState } from "react";
import { TaskModal } from "./taskModal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ProfileInfo } from "../profileInfo";
import { TasksData } from "./tasksData";

interface PanelContentProps {
    user:any;
}

export function PanelContent({ user }:PanelContentProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    useGSAP(() => {
        gsap.fromTo('.panelBtn', { opacity:0, scale:0, x:-40 }, { opacity:1, scale:1, x:0, ease:'sine', duration:0.8 });
    }, []);

    useGSAP(() => {
        gsap.fromTo('.task', { opacity:0, x:-100, }, { opacity:1, x:0, ease:'sine', stagger:0.4, delay:0.4, duration:0.8 });
    }, [user]);

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
                    <TasksData user={user} />
                    <div className="mt-8 grid place-content-center">
                        <button onClick={() => setIsOpenModal(true)} className="panelBtn cursor-pointer z-10 w-40 rounded-md cursor-pointeer p-3 bg-blue-400 text-white transition-all duration-500 hover:opacity-80">Criar tarefa</button>
                    </div>
                </div>
            </div>
            <NavBar />
            <TaskModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} user={user} />
        </>
  );
}