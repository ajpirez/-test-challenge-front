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

interface PaginationContextProps {
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    totalElements: number;
    setTotalElements: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationContext = createContext<PaginationContextProps>({
    totalPages: 0,
    setTotalPages: () => {
    },
    totalElements: 0,
    setTotalElements: () => {
    },
});

interface LoaderContextProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoaderContext = createContext<LoaderContextProps>({
    loading: false,
    setLoading: () => {
    }
});

export const Providers = ({children}: Props) => {
    const [modalOpen, setModalOpen] = useState<string | null>(null);
    const [student, setStudent] = useState<User | null>(null);
    const [selectedIdUsers, setSelectedIdUsers] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalElements, setTotalElements] = useState<number>(0)


    return (
        <ModalContext.Provider value={{
            modalOpen,
            setModalOpen,
            student,
            setStudent,
            selectedIdUsers,
            setSelectedIdUsers
        }}>
            <ErrorContext.Provider value={{error, setError}}>
                <LoaderContext.Provider value={{loading, setLoading}}>
                    <PaginationContext.Provider value={{totalPages, setTotalPages, totalElements, setTotalElements}}>
                        <SessionProvider>
                            {children}
                        </SessionProvider>
                    </PaginationContext.Provider>
                </LoaderContext.Provider>
            </ErrorContext.Provider>
        </ModalContext.Provider>
    );
};