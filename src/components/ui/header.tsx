'use client'
import {useContext} from "react";
import {ModalContext} from "@/components/providers/Providers";
import Image from "next/image";
import styles from '../styles/header.module.scss'

const Header = () => {
    const {setModalOpen} = useContext(ModalContext)

    return (
        <div className={styles.header}>
            <h2 className={styles.h2}>Manage <span>Students</span></h2>
            <div className={styles.actions}>
                <button onClick={() => setModalOpen('delete')}
                        className={styles.delete}><Image src="/minus.png"
                                                         height={10}
                                                         width={10}
                                                         alt="Delete"/> Delete
                </button>
                <button onClick={() => setModalOpen('add')}
                        className={styles.add}><Image src="/mas.png"
                                                      height={10}
                                                      width={10}
                                                      alt="Add"/> Add New Student
                </button>
            </div>
        </div>
    );
};

export default Header;