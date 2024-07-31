'use client'
import {useContext} from 'react';
import styles from '../styles/Modal.module.scss';
import Image from 'next/image';
import {ModalContext} from "@/components/providers/Providers";
import RegisterForm from "@/app/auth/new-account/ui/RegisterForm";
import DeleteForm from "@/components/student/deleteUserForm";

type ModalType = 'add' | 'edit' | 'delete'

function UserModal() {
    const {modalOpen, setModalOpen, student,selectedIdUsers} = useContext(ModalContext);
    console.log({student})

    const modalContent: Record<ModalType, { title: string; content: JSX.Element }> = {
        add: {
            title: 'Create an account',
            content: (
                <RegisterForm type={'add'}/>
            )
        },
        edit: {
            title: 'Edit an account',
            content: (
                <RegisterForm type={'edit'}
                              externalData={student}/>
            )
        },
        delete: {
            title: 'Delete an account',
            content: (
                <DeleteForm/>
            )
        }
    };

    if (!modalOpen) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <Image
                    onClick={() => setModalOpen(null)}
                    className={styles.close}
                    alt="Close modal"
                    src={'/close.png'}
                    width={32}
                    height={32}
                />
                <h2 className={styles.title}>{modalContent[modalOpen as ModalType]?.title}</h2>
                {modalContent[modalOpen as ModalType]?.content}
            </div>
        </div>
    );
}

export default UserModal;
