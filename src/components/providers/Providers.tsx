'use client'

import {SessionProvider} from "next-auth/react";
import React, {createContext, useState} from "react";
import {User} from "@/lib/interfaces/userLogin.interface";

interface Props {
    children: React.ReactNode
}

interface ModalContextProps {
    modalOpen: string | null;
    setModalOpen: React.Dispatch<React.SetStateAction<string | null>>;
    student: User | null;
    setStudent: React.Dispatch<React.SetStateAction<User | null>>
}

export const ModalContext = createContext<ModalContextProps>({
    modalOpen: 'add',
    setModalOpen: () => {
    },
    student: null,
    setStudent: () => {
    }
});

export const Providers = ({children}: Props) => {
    const [modalOpen, setModalOpen] = useState<string | null>(null);
    const [student, setStudent] = useState<User | null>(null);


    return (
        <ModalContext.Provider value={{modalOpen, setModalOpen, student, setStudent}}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ModalContext.Provider>
    );
};