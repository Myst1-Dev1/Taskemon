'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface ProfileInfoProps {
    user: any;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
    const pointsRef = useRef<HTMLSpanElement>(null);
    const prevPointsRef = useRef<number>(user?.points || 0);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "sine", stagger: 0.4, delay: 0.2, duration: 0.8 },
        });
        tl.fromTo(".userAvatar", { opacity: 0, y: 40 }, { opacity: 1, y: 0 });
        tl.fromTo(".userName", { opacity: 0, x: -30 }, { opacity: 1, x: 0 });
        tl.fromTo(".userPoints", { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
    }, []);

    useEffect(() => {
        if (!pointsRef.current || typeof user?.points !== "number") return;

        const startVal = prevPointsRef.current || 0;
        const endVal = user.points;

        const obj = { val: startVal };

        gsap.to(obj, {
            val: endVal,
            duration: 1,
            ease: "power1.out",
            onUpdate: () => {
                if (pointsRef.current) {
                    pointsRef.current.textContent = `${Math.floor(obj.val)} pontos`;
                }
            },
            onComplete: () => {
                if (pointsRef.current) {
                    pointsRef.current.textContent = `${endVal} pontos`;
                }
            },
        });

        prevPointsRef.current = endVal;
    }, [user?.points]);

    return (
        <div className="flex flex-col justify-center items-center">
            <Image
                className="userAvatar w-20 h-20 object-cover rounded-full aspect-square"
                src={user?.avatar || "/images/avatar.png"}
                width={100}
                height={100}
                alt="avatar do usuário"
            />
            <h2 className="userName mt-1 text-xl font-bold">{user?.name}</h2>
            <span
                ref={pointsRef}
                className="userPoints mt-4 rounded-full px-3 py-1 bg-yellow-300"
            >
                {user?.points} pontos
            </span>
        </div>
    );
}