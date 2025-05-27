'use server';

import { cookies } from 'next/headers'

export async function fetchUserData() {
    const cookieStore = cookies();
    const userToken = (await cookieStore).get('user-token')?.value;

    if (!userToken) throw new Error("Usuário não autenticado");

    const userData = JSON.parse(decodeURIComponent(userToken));
    const userId = userData._id;

    const res = await fetch(`http://localhost:4000/user/${userId}`, {
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