import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

interface ModalProps {
    open: boolean;
    children: React.ReactNode;
}

export function Modal({ open, children }:ModalProps) {

    useGSAP(() => {
        gsap.fromTo('.modal', { opacity:0, scale:0 }, { opacity:1, scale:1, ease:'sine', duration:0.4 });
    }, [open]);

    return (
        <>
            {open &&
            <div className="modal z-30 w-full min-h-screen flex justify-center items-center bg-white fixed top-0 left-0 right-0">
                {children}
            </div>
            }
        </>
    )
}