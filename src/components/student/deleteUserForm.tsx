import React, {useContext} from 'react';
import styles from '../styles/DeleteUserForm.module.scss';
import {ErrorContext, LoaderContext, ModalContext} from "@/components/providers/Providers";
import {customRevalidateTag} from "@/lib/actions/helpers";
import {deleteUser} from "@/lib/actions/auth/delete";
import {useRouter, useSearchParams} from "next/navigation";


const DeleteForm = () => {
    const {setError} = useContext(ErrorContext)
    const {setModalOpen, selectedIdUsers, setSelectedIdUsers} = useContext(ModalContext)
    const {setLoading} = useContext(LoaderContext)
    const searchParams = useSearchParams()
    const router = useRouter()


    const pageString = searchParams.get('page') ?? 1
    const handleDelete = async () => {
        setLoading(true)
        if (!selectedIdUsers.length) {
            setLoading(false)
            setError('Please select at least one user')
            return
        }
        const resp = await deleteUser(selectedIdUsers)
        if (!resp.ok) {
            setError(resp.message)
            setLoading(false)
            return
        }
        await customRevalidateTag('getUsers');
        setModalOpen(null)
        setSelectedIdUsers([])
        setLoading(false)
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
        </div>
    );
};

export default DeleteForm;