'use client';

import { NavBar } from "@/components/navBar";
import Image from "next/image";
import { useState } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { Tasks } from "@/@types/Tasks";
import { TaskModal } from "./taskModal";
import { deleteTask } from "@/actions/taskActions";
import { useRouter } from "next/navigation";
import { HistoryEntry } from "@/@types/History";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ProfileInfo } from "../profileInfo";

interface PanelContentProps {
    user:any;
}

export function PanelContent({ user }:PanelContentProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const router = useRouter();

    async function completeTask(userId:string, taskId:string) {
      try {
        const res = await fetch("http://localhost:4000/user/completeTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, taskId }),
        });

            const data = await res.json();

            if (!res.ok) {
            alert(data.message || 'Erro desconhecido ao concluir a tarefa.');
            return;
        }
      } catch (error) {
        console.log('Tivemos um erro ao marcar a conclusão da tarefa!', error);
      }

      router.refresh();
    }

    useGSAP(() => {
        const tl = gsap.timeline({defaults: { ease:'sine', stagger:0.4, delay:0.4, duration:0.8 }});
        tl.fromTo('.task', { opacity:0, x:-100, }, { opacity:1, x:0 });
        tl.fromTo('.panelBtn', { opacity:0, scale:0, x:-40 }, { opacity:1, scale:1, x:0 });
    }, []);

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

                    <div className="mt-5 flex flex-col gap-4 h-[500px] overflow-y-scroll scrollDontShow">
                        {user?.tasks.map((task: Tasks) => {
                            const today = new Date().toLocaleDateString('pt-BR');

                            const isTaskCompletedToday = user?.history?.some((entry: HistoryEntry) =>
                                entry.actionType === 'task_completed' &&
                                entry.referenceId?._id.toString() === task._id.toString() &&
                                new Date(entry.date).toLocaleDateString('pt-BR') === today
                            );

                            return (
                                <div key={task._id} className="task relative w-full p-3 bg-[#FFFFFF4A] rounded-md flex flex-col gap-3">
                                    <h3 className="font-bold">{task.title}</h3>
                                    <p>{task.description}</p>
                                    <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">{task.points} pontos</span>

                                    <div
                                        onClick={() => {
                                            if (!isTaskCompletedToday) {
                                                completeTask(user?._id, task._id);
                                            }
                                        }}
                                        className={`w-7 h-7 rounded-full grid place-content-center bg-green-500 text-white absolute top-2 right-2 transition-all duration-500 
                                            ${isTaskCompletedToday ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-50'}
                                        `}
                                    >
                                        <FaCheck />
                                    </div>

                                    <div
                                        onClick={() => deleteTask(task._id)}
                                        className="w-7 h-7 grid place-content-center bg-red-200 text-red-500 rounded-md absolute bottom-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50"
                                    >
                                        <FaTrashAlt />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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