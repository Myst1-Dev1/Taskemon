import { HistoryEntry } from "@/@types/History";
import { Tasks } from "@/@types/Tasks";
import { deleteTask } from "@/actions/taskActions";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

interface TasksDataProps {
    user:any;
}

export function TasksData({user}: TasksDataProps) {

    const router = useRouter();

    async function completeTask(userId:string, taskId:string) {
          try {
            const res = await fetch("https://lab.mystdev.com.br/taskemon/user/completeTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, taskId }),
            });
    
                const data = await res.json();
    
                if (!res.ok) {
                    toast.error(data.message || 'Erro desconhecido ao concluir a tarefa.');
                    return;
                }else {
                    toast.success('Tarefa completada!');
                }
          } catch (error) {
            console.log('Tivemos um erro ao marcar a conclusão da tarefa!', error);
          }
    
          router.refresh();
    }
    
    async function handleDeleteTask(id:string) {
        try {
            await deleteTask(id);
            toast.success('Tarefa deletada com sucesso!');
        } catch (error) {
            toast.error('Tivemos um erro ao deletar a tarefa!');
        }
    }

    return (
        <>
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
                                onClick={() => handleDeleteTask(task._id)}
                                className="w-7 h-7 grid place-content-center bg-red-200 text-red-500 rounded-md absolute bottom-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50"
                            >
                                <FaTrashAlt />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}