'use client'

import {SessionProvider} from "next-auth/react";
import React, {createContext, useState} from "react";

interface Props {
    children: React.ReactNode
}

interface ModalContextProps {
    modalOpen: string | null;
    setModalOpen: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ModalContext = createContext<ModalContextProps>({
    modalOpen: 'add',
    setModalOpen: () => {
    },
});

export const Providers = ({children}: Props) => {
    const [modalOpen, setModalOpen] = useState<string | null>(null);


    return (
        <ModalContext.Provider value={{modalOpen, setModalOpen}}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ModalContext.Provider>
    );
};