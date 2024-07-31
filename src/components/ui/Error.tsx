'use client'

import {useContext, useEffect} from "react";
import {ErrorContext} from "@/components/providers/Providers";
import styles from '../styles/Error.module.scss'


const ErrorTooltip = () => {
    const {
        error,
        setError
    } = useContext(ErrorContext)

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 3000)
        }


    }, [error, setError]);

    if (!error) return null

    return (
        <div className={styles.container}>
            <h4 className={styles.element}>{error}</h4>
        </div>
    );
};

export default ErrorTooltip;