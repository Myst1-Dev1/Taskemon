'use client';

import { Modal } from "@/components/modal";
import { NavBar } from "@/components/navBar";
import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Awards() {
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
    
                    <div className="z-10 mt-5 flex flex-col gap-4 h-[500px] overflow-y-scroll scrollDontShow">
                        <div className="w-full p-3 bg-[#FFFFFF4A] rounded-md flex items-center gap-5">
                            <Image className="w-10 h-10 object-cover" src="/images/joystick.png" width={100} height={100} alt="foto que representa o prêmio" />
                            <div className="w-full flex flex-col gap-4">
                                <h3>30 minutos a mais de gameplay</h3>
                                <div className="flex justify-between items-center">
                                    <button className="z-10 cursor-pointer rounded-full w-fit px-2 py-1 text-white bg-green-500 transition-all duration-500 hover:opacity-50">Resgatar prêmio</button>
                                    <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">30 pontos</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-3 bg-[#FFFFFF4A] rounded-md flex items-center gap-5">
                            <Image className="w-10 h-10 object-cover" src="/images/joystick.png" width={100} height={100} alt="foto que representa o prêmio" />
                            <div className="w-full flex flex-col gap-4">
                                <h3>30 minutos a mais de gameplay</h3>
                                <div className="flex justify-between items-center">
                                    <button className="z-10 cursor-pointer rounded-full w-fit px-2 py-1 text-white bg-green-500 transition-all duration-500 hover:opacity-50">Resgatar prêmio</button>
                                    <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">30 pontos</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-3 bg-[#FFFFFF4A] rounded-md flex items-center gap-5">
                            <Image className="w-10 h-10 object-cover" src="/images/joystick.png" width={100} height={100} alt="foto que representa o prêmio" />
                            <div className="w-full flex flex-col gap-4">
                                <h3>30 minutos a mais de gameplay</h3>
                                <div className="flex justify-between items-center">
                                    <button className="z-10 cursor-pointer rounded-full w-fit px-2 py-1 text-white bg-green-500 transition-all duration-500 hover:opacity-50">Resgatar prêmio</button>
                                    <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">30 pontos</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-3 bg-[#FFFFFF4A] rounded-md flex items-center gap-5">
                            <Image className="w-10 h-10 object-cover" src="/images/joystick.png" width={100} height={100} alt="foto que representa o prêmio" />
                            <div className="w-full flex flex-col gap-4">
                                <h3>30 minutos a mais de gameplay</h3>
                                <div className="flex justify-between items-center">
                                    <button className="z-10 cursor-pointer rounded-full w-fit px-2 py-1 text-white bg-green-500 transition-all duration-500 hover:opacity-50">Resgatar prêmio</button>
                                    <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">30 pontos</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-3 bg-[#FFFFFF4A] rounded-md flex items-center gap-5">
                            <Image className="w-10 h-10 object-cover" src="/images/joystick.png" width={100} height={100} alt="foto que representa o prêmio" />
                            <div className="w-full flex flex-col gap-4">
                                <h3>30 minutos a mais de gameplay</h3>
                                <div className="flex justify-between items-center">
                                    <button className="z-10 cursor-pointer rounded-full w-fit px-2 py-1 text-white bg-green-500 transition-all duration-500 hover:opacity-50">Resgatar prêmio</button>
                                    <span className="bg-red-200 p-1 w-fit text-red-500 rounded-lg">30 pontos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 grid place-content-center">
                        <button onClick={() => setIsOpenModal(true)} className="z-10 w-48 rounded-md cursor-pointeer p-3 bg-blue-400 text-white transition-all duration-500 hover:opacity-80">Adicionar Prêmios</button>
                    </div>
                </div>
            </div>
            <NavBar />
            <Modal open={isOpenModal}>
                <div className="px-4 flex flex-col gap-10">
                    <h2 className="text-center font-bold">Crie prêmios para que possam ser resgatados !</h2>
                    <form action="" className="max-w-xl w-full flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <div className="w-12 h-12 rounded-full aspect-square grid place-content-center border border-gray-300">
                                <Image className="w-10 h-10 object-cover" src="/images/joystick.png" width={200} height={200} alt="imagem que representa o prêmio" />
                            </div>
                            <input type="file" className="hidden" id="file" />
                            <label htmlFor="file" className="cursor-pointer text-blue-700">Envie uma imagem que define o prêmio</label>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="premiumName">Nome do premio</label>
                            <input type="text" id="premiumName" className="border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="Playstation" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="premiumPoints">Pontos para resgate do prêmio</label>
                            <input type="number" id="premiumPoints" className="input-number border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="20" />
                        </div>
                        <button className="bg-blue-500 text-white rounded-md w-full p-3 mt-5 transition-all duration-500 hover:brightness-90">Enviar</button>
                    </form>
                    <span onClick={() => setIsOpenModal(false)} className="absolute top-4 right-2 w-10 rounded-full h-10 bg-blue-300 text-white grid place-content-center transition-all duration-500 hover:brightness-75 cursor-pointer">
                        <FaTimes />
                    </span>
                </div>
            </Modal>
        </>
    )
}