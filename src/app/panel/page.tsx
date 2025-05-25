'use client';

import { Modal } from "@/components/modal";
import { NavBar } from "@/components/navBar";
import Image from "next/image";
import { useState } from "react";
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";

export default function Panel() {
    const [isOpenModal, setIsOpenModal] = useState(false);

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

                    <div className="mt-5 flex flex-col gap-4 h-[500px] overflow-y-scroll scrollDontShow">
                        <div className="relative w-full p-3 bg-[#FFFFFF4A] rounded-md flex flex-col gap-3">
                            <h3 className="font-bold">Titulo</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">30 pontos</span>
                            <div className="w-7 h-7 rounded-full grid place-content-center bg-green-500 text-white absolute top-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                <FaCheck />
                            </div>
                            <div className="w-7 h-7 grid place-content-center bg-red-200 text-red-500 rounded-md absolute bottom-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                <FaTrashAlt />
                            </div>
                        </div>
                        <div className="relative w-full p-3 bg-[#FFFFFF4A] rounded-md flex flex-col gap-3">
                            <h3 className="font-bold">Titulo</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">30 pontos</span>
                            <div className="w-7 h-7 rounded-full grid place-content-center bg-green-500 text-white absolute top-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                <FaCheck />
                            </div>
                            <div className="w-7 h-7 grid place-content-center bg-red-200 text-red-500 rounded-md absolute bottom-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                <FaTrashAlt />
                            </div>
                        </div>
                        <div className="relative w-full p-3 bg-[#FFFFFF4A] rounded-md flex flex-col gap-3">
                            <h3 className="font-bold">Titulo</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">30 pontos</span>
                            <div className="w-7 h-7 rounded-full grid place-content-center bg-green-500 text-white absolute top-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                <FaCheck />
                            </div>
                            <div className="w-7 h-7 grid place-content-center bg-red-200 text-red-500 rounded-md absolute bottom-2 right-2 cursor-pointer transition-all duration-500 hover:opacity-50">
                                <FaTrashAlt />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 grid place-content-center">
                        <button onClick={() => setIsOpenModal(true)} className="z-10 w-40 rounded-md cursor-pointeer p-3 bg-blue-400 text-white transition-all duration-500 hover:opacity-80">Criar tarefa</button>
                    </div>
                </div>
            </div>
            <NavBar />
            <Modal open={isOpenModal}>
                <div className="px-4 flex flex-col gap-10">
                    <h2 className="text-center font-bold">Olá! Vamos criar as nossas tarefas para gerenciarmos nossos prêmios</h2>
                    <form action="" className="max-w-xl w-full flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="title">Nome da tarefa</label>
                            <input type="text" id="title" className="border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="Comprar pão" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="description">Descrição da tarefa</label>
                            <input type="text" id="description" className="border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="Va até a padaria e ..." />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="points">Pontos pela realização da tarefa</label>
                            <input type="number" id="points" className="input-number border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="20" />
                        </div>
                        <button className="bg-blue-500 text-white rounded-md w-full p-3 mt-5 transition-all duration-500 hover:brightness-90">Enviar</button>
                    </form>
                    <span onClick={() => setIsOpenModal(false)} className="absolute top-4 right-2 w-10 rounded-full h-10 bg-blue-300 text-white grid place-content-center transition-all duration-500 hover:brightness-75 cursor-pointer">
                        <FaTimes />
                    </span>
                </div>
            </Modal>
        </>
  );
}
