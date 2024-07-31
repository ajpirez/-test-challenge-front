'use client'
import React, {useContext, useEffect} from 'react';
import styles from '../styles/Loader.module.scss';
import {LoaderContext} from "@/components/providers/Providers";

const Loader = () => {
    const {
        loading,
        setLoading
    } = useContext(LoaderContext)

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }


    }, [loading, setLoading]);

    if (!loading) return null

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader} />
        </div>
    );
};

export default Loader;
