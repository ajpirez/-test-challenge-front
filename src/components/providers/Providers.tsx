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
    selectedIdUsers: string[];
    setSelectedIdUsers: React.Dispatch<React.SetStateAction<string[]>>
}

export const ModalContext = createContext<ModalContextProps>({
    modalOpen: 'add',
    setModalOpen: () => {
    },
    student: null,
    setStudent: () => {
    }
    ,
    selectedIdUsers: [],
    setSelectedIdUsers: () => {
    }
});

interface ErrorContextProps {
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ErrorContext = createContext<ErrorContextProps>({
    error: '',
    setError: () => {
    },
});

export const Providers = ({children}: Props) => {
    const [modalOpen, setModalOpen] = useState<string | null>(null);
    const [student, setStudent] = useState<User | null>(null);
    const [selectedIdUsers, setSelectedIdUsers] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null)


    return (
        <ModalContext.Provider value={{modalOpen, setModalOpen, student, setStudent, selectedIdUsers,setSelectedIdUsers}}>
            <ErrorContext.Provider value={{error, setError}}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ErrorContext.Provider>
        </ModalContext.Provider>
    );
};