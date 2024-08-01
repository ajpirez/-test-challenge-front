'use client'
import {useContext} from 'react';
import styles from '../styles/Modal.module.scss';
import Image from 'next/image';
import {ModalContext, PaginationContext} from "@/components/providers/Providers";
import UserGenericForm from "@/components/student/userGenericForm";
import DeleteForm from "@/components/student/deleteUserForm";

type ModalType = 'add' | 'edit' | 'delete'

function UserModal() {
    const {modalOpen, setModalOpen, student, selectedIdUsers} = useContext(ModalContext);
    const modalContent: Record<ModalType, { title: string; content: JSX.Element }> = {
        add: {
            title: 'Create an account',
            content: (
                <UserGenericForm type={'add'}/>
            )
        },
        edit: {
            title: 'Edit an account',
            content: (
                <UserGenericForm type={'edit'}
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
        <div className={styles.modal}
             onClick={() => setModalOpen(null)}>
            <div className={styles.content}
                 onClick={(e) => e.stopPropagation()}>
                <Image
                    onClick={() => setModalOpen(null)}
                    className={styles.close}
                    alt="Close modal"
                    src={'/Close.png'}
                    width={32}
                    height={32}
                />
                <h2 className={`${styles.title} ${styles.h2}`}>{modalContent[modalOpen as ModalType]?.title}</h2>
                {modalContent[modalOpen as ModalType]?.content}
            </div>
        </div>
    );
}

export default UserModal;
