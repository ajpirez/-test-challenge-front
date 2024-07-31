'use client';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import styles from '../styles/Container.module.scss'

interface IPropsContainer extends HTMLAttributes<HTMLDivElement> {}

const Container: FC<PropsWithChildren<IPropsContainer>> = ({ children, className }) => {
    return <div className={styles.container}>{children}</div>;
};

export default Container;