import React from "react";

interface ModalProps {
    open: boolean;
    children: React.ReactNode;
}

export function Modal({ open, children }:ModalProps) {
    return (
        <>
            {open &&
            <div className="z-30 w-full min-h-screen flex justify-center items-center bg-white fixed top-0 left-0 right-0">
                {children}
            </div>
            }
        </>
    )
}