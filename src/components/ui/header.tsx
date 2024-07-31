'use client'
import styles from '../styles/Header.module.scss';
import {useContext} from "react";
import {ModalContext} from "@/components/providers/Providers";
import Image from "next/image";

const Header = () => {
    const {setModalOpen} = useContext(ModalContext)

    return (
        <div className={styles.header}>
            <h2>Manage <span>Students</span></h2>
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