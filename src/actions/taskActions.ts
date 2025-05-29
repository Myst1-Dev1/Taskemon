'use server';

import { revalidatePath } from "next/cache";

export async function createTaskAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const points = formData.get("points") as string;
  const userId = formData.get("userId") as string;

  const res = await fetch("https://lab.mystdev.com.br/taskemon/tasks/createTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      points,
      userId
    }),
  });

  if (!res.ok) throw new Error("Erro ao criar tarefa");

  revalidatePath('/panel');

  return await res.json();
}

export async function deleteTask(id:string) {
  try {
    await fetch("https://lab.mystdev.com.br/taskemon/tasks/deleteTask/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    console.log('Tarefa deletada com sucesso!');
  } catch (error) {
    console.log('Tivemos um erro ao deletar a tarefa!',error);
  }

  revalidatePath('/panel');
}