import { createAward } from "@/actions/awardActions";
import { Loading } from "@/components/loading";
import { Modal } from "@/components/modal";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { FaTimes } from "react-icons/fa";

interface AwardModalProps {
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    user: any;
}

export function AwardModal({ isOpenModal, setIsOpenModal, user }:AwardModalProps) {
    const [file, setFile] = useState<File | null>();
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    const { edgestore } = useEdgeStore();

    const handleCreateAward = (formData: FormData) => {
        startTransition(async () => {
            try {
            if (file) {
                const res = await edgestore.myPublicImages.upload({ file });

                if (res.url) {
                formData.append("awardImg", res.url);
                formData.append("userId", user._id);
                await createAward(formData);
                setMessage("Recompensa criada com sucesso!");
                }
            } else {
                throw new Error("Falha ao fazer upload da imagem.");
            }
            } catch (error) {
            setMessage("Erro ao criar a recompensa!");
            } finally {
            setIsOpenModal(false);
            }
        });
    };

    return (
        <>
            <Modal open={isOpenModal}>
                <div className="px-4 flex flex-col gap-10">
                    <h2 className="text-center font-bold">Crie prêmios para que possam ser resgatados !</h2>
                    <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleCreateAward(formData);
                        }} className="max-w-xl w-full flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <div className="w-12 h-12 rounded-full aspect-square grid place-content-center border border-gray-300">
                                <Image className="w-10 h-10 object-cover" src={file ? URL.createObjectURL(file) : "/images/joystick.png"} width={200} height={200} alt="imagem que representa o prêmio" />
                            </div>
                            <input type="file" name="premiumImg" className="hidden" id="file" onChange={(e) => setFile(e.target.files?.[0])} />
                            <label htmlFor="file" className="cursor-pointer text-blue-700">Envie uma imagem que define o prêmio</label>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="awardTitle">Nome do premio</label>
                            <input type="text" name="awardTitle" id="awardTitle" className="border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="Playstation" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="awardPoints">Pontos para resgate do prêmio</label>
                            <input type="number" name="awardPoints" id="awardPoints" className="input-number border border-gray-300 rounded-lg w-full outline-none p-3" placeholder="20" />
                        </div>
                        <button className="cursor-pointer bg-blue-500 text-white rounded-md w-full p-3 mt-5 transition-all duration-500 hover:brightness-90">
                            {isPending ? <Loading /> : 'Enviar'}
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