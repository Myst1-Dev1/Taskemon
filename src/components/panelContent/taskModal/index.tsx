import { createTaskAction } from "@/actions/taskActions";
import { Loading } from "@/components/loading";
import { Modal } from "@/components/modal";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { FaTimes } from "react-icons/fa";

interface TaskModalProps {
    isOpenModal: boolean;
    setIsOpenModal:Dispatch<SetStateAction<boolean>>;
    user:any;
}

export function TaskModal({ isOpenModal, setIsOpenModal, user }:TaskModalProps) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    const handleCreateTask = (formData: FormData) => {
        formData.append("userId", user._id);

        startTransition(async () => {
        try {
            const newTask = await createTaskAction(formData);
            setMessage(`Tarefa criada: ${newTask.title}`);
        } catch (err) {
            setMessage("Erro ao criar tarefa");
        } finally {
            setIsOpenModal(false);
        }
        });
    };

    return (
        <>
            <Modal open={isOpenModal}>
                <div className="px-4 flex flex-col gap-10">
                    <h2 className="text-center font-bold">Olá! Vamos criar as nossas tarefas para gerenciarmos nossos prêmios</h2>
                    <form action={handleCreateTask} className="max-w-xl w-full flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="title">Nome da tarefa</label>
                            <input type="text" name="title" id="title" className="border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="Comprar pão" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="description">Descrição da tarefa</label>
                            <input type="text" name="description" id="description" className="border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="Va até a padaria e ..." />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="points">Pontos pela realização da tarefa</label>
                            <input type="number" name="points" id="points" className="input-number border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="20" />
                        </div>
                        <button className="cursor-pointer bg-blue-500 text-white rounded-md w-full p-3 mt-5 transition-all duration-500 hover:brightness-90">
                            {isPending ? <Loading /> : "Enviar"}
                        </button>
                        {message && <p>{message}</p>}
                    </form>
                    <span onClick={() => setIsOpenModal(false)} className="absolute top-4 right-2 w-10 rounded-full h-10 bg-blue-300 text-white grid place-content-center transition-all duration-500 hover:brightness-75 cursor-pointer">
                        <FaTimes />
                    </span>
                </div>
            </Modal>
        </>
    )
}