'use client'
import React from 'react';
import styles from '../styles/StudentInfo.module.scss';
import {User} from "@/lib/interfaces/userLogin.interface";
import {useRouter} from "next/navigation";

function StudentInfo({user,page}: { user: User,page:string }) {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => router.push(`/?page=${page}`)}>
                Back
            </button>
            <div className={styles.main}>
                <h5 className={`${styles.name} ${styles.h5}`}>{user.firstName} {user.lastName}</h5>
                <p className={styles.email}>Email: {user.email}</p>
                <p className={styles.age}>Age: {user.age}</p>
                <p className={styles.grade}>Grade: {user.grade}</p>
                <p className={styles.role}>Role: {user.rols.map(rol => rol.type).join(', ')}</p>
            </div>
        </div>
    );
}

export default StudentInfo;
