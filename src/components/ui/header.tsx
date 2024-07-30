'use client'
import styles from '../styles/Header.module.scss';
import {useContext, useState} from "react";
import {ModalContext} from "@/components/providers/Providers";

const Header = () => {
    const {setModalOpen} = useContext(ModalContext)

    return (
        <div className={styles.header}>
            <h2>Manage <span>Employees</span></h2>
            <div className={styles.actions}>
                <button
                    className={styles.delete}><img src="/placeholder-icons/delete-icon.png"
                                                   alt="Delete"/> Delete
                </button>
                <button onClick={()=>setModalOpen('add')} className={styles.add}><img src="/placeholder-icons/add-icon.png"
                                                    alt="Add"/> Add New Student
                </button>
            </div>
        </div>
    );
};

export default Header;