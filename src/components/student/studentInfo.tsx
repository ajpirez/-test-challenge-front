'use client'
import React from 'react';
import styles from '../styles/StudentInfo.module.scss';
import {User} from "@/lib/interfaces/userLogin.interface";
import {useRouter} from "next/navigation";

function StudentInfo({user}: { user: User }) {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => router.push('/')}>
                Back
            </button>
            <div className={styles.main}>
                <h1 className={styles.name}>{user.firstName} {user.lastName}</h1>
                <p className={styles.email}>Email: {user.email}</p>
                <p className={styles.age}>Age: {user.age}</p>
                <p className={styles.grade}>Grade: {user.grade}</p>
                <p className={styles.role}>Role: {user.rols.map(rol => rol.type).join(', ')}</p>
            </div>
        </div>
    );
}

export default StudentInfo;
