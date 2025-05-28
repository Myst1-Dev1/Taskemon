'use client';

import { NavBar } from "@/components/navBar";
import Image from "next/image";
import { useState } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { Tasks } from "@/@types/Tasks";
import { TaskModal } from "./taskModal";
import { deleteTask } from "@/actions/taskActions";
import { useRouter } from "next/navigation";

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

                    <div className="mt-5 flex flex-col gap-4 h-[500px] overflow-y-scroll scrollDontShow">
                        {user?.tasks.map((task:Tasks) => (
                            <div key={task._id} className="relative w-full p-3 bg-[#FFFFFF4A] rounded-md flex flex-col gap-3">
                                <h3 className="font-bold">{task.title}</h3>
                                <p>{task.description}</p>
                                <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">{task.points} pontos</span>
                                <div onClick={() => completeTask(user?._id, task._id)} className="w-7 h-7 rounded-full grid place-content-center bg-green-500 text-white absolute top-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                    <FaCheck />
                                </div>
                                <div onClick={() => deleteTask(task._id)} className="w-7 h-7 grid place-content-center bg-red-200 text-red-500 rounded-md absolute bottom-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                    <FaTrashAlt />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 grid place-content-center">
                        <button onClick={() => setIsOpenModal(true)} className="cursor-pointer z-10 w-40 rounded-md cursor-pointeer p-3 bg-blue-400 text-white transition-all duration-500 hover:opacity-80">Criar tarefa</button>
                    </div>
                </div>
            </div>
            <NavBar />
            <TaskModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} user={user} />
        </>
  );
}