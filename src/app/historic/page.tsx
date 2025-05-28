import { HistoryEntry } from "@/@types/History";
import { NavBar } from "@/components/navBar";
import { fetchUserData } from "@/services/fetchUserData";
import Image from "next/image";
import { use } from "react";
import { FaGift } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";

export default function Historic() {
    const user = use(fetchUserData());

    console.log(user);

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
    
                    <div className="z-10 mt-5 flex flex-col gap-2 h-[600px] bg-[#FFFFFF4A] rounded-md w-full overflow-y-scroll scrollDontShow">
                        {user?.history.length === 0 ? 
                            <p className="text-center mt-5 text-red-600 font-bold">Você ainda não tem tarefas feitas ou recompensas resgatadas em seu histórico</p> 
                            : user?.history.map((story:HistoryEntry) => (
                        <div key={story._id} className="p-3 flex justify-between items-center border-b border-black/10">
                            <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-full grid place-content-center ${story.referenceModel === 'Tasks' ? 'bg-green-500 text-white' : 'bg-red-200 text-red-500'}`}>
                                    {story.referenceModel === 'Tasks' ? <FaClipboardList /> : <FaGift />}
                                </div>
                                <h5 className="font-semibold max-w-64 text-sm">{story.referenceId?.title || story.referenceId?.awardTitle}</h5>
                            </div>
                            <span className="text-gray-500 font-normal text-xs mb-auto">{new Date(story.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}