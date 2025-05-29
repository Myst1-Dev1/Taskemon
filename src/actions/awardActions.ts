'use server';

import { revalidatePath } from "next/cache";

export async function createAward(formData: FormData) {
    const awardImg = formData.get('awardImg') as string;
    const awardTitle = formData.get('awardTitle') as string;
    const awardPoints = formData.get('awardPoints') as string;
    const userId = formData.get("userId") as string;

    try {
        await fetch("https://lab.mystdev.com.br/taskemon/awards/createAward", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                awardImg,
                awardTitle,
                awardPoints,
                userId
            })
        });

        console.log('Recompensa criada com sucesso!');
    } catch (error) {
        console.log(error);
    }

    revalidatePath('/awards');
}

export async function deleteAward(id:string) {
    try {
        await fetch("https://lab.mystdev.com.br/taskemon/awards/deleteAward/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        console.log('Recompensa deletada com sucesso!');
    } catch (error) {
        console.log('Erro ao deletar a recompensa', error);
    }

    revalidatePath('/awards')
}