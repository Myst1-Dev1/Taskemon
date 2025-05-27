'use server';

import { revalidatePath } from "next/cache";

export async function createTaskAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const points = formData.get("points") as string;
  const userId = formData.get("userId") as string;

  const res = await fetch("http://localhost:4000/tasks/createTask", {
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
