'use server';

import { cookies } from 'next/headers'

export async function fetchUserData() {
    const cookieStore = cookies();
    const userToken = (await cookieStore).get('user-token')?.value;

    if (!userToken) throw new Error("Usuário não autenticado");

    const userData = JSON.parse(decodeURIComponent(userToken));
    const userId = userData._id;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(`https://lab.mystdev.com.br/taskemon/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Erro ao buscar usuário");
    }

    return res.json();
}