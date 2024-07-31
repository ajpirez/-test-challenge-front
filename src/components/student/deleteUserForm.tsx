import React, {useContext, useState} from 'react';
import styles from '../styles/DeleteUserForm.module.scss';
import {ModalContext} from "@/components/providers/Providers";
import {customRevalidateTag} from "@/lib/actions/helpers";
import {deleteUser} from "@/lib/actions/auth/delete";

const DeleteForm = () => {
    const {setModalOpen, selectedIdUsers, setSelectedIdUsers} = useContext(ModalContext)
    const [errorMessage, setErrorMessage] = useState("")

    const handleDelete = async () => {
        const resp = await deleteUser(selectedIdUsers)
        if (!resp.ok) {
            setErrorMessage(resp.message)
            return
        }

        await customRevalidateTag('getUsers');
        setModalOpen(null)
    }

    return (
        <div className={styles.form}>
            <div className={styles.header}>Are you sure you want to delete this item?</div>
            <div className={styles.actions}>
                <button className={`${styles.confirm} ${styles.button}`}
                        onClick={() => handleDelete()}>Confirm
                </button>
                <button onClick={() => setModalOpen(null)}
                        className={`${styles.cancel} ${styles.button}`}>Cancel
                </button>
            </div>
            {
                <span className={styles.error}>{errorMessage}</span>
            }
        </div>
    );
};

export default DeleteForm;