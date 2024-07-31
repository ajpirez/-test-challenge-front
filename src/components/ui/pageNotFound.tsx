import {titleFont} from "@/config/font";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/PageNotFound.module.scss'

export const PageNotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.div}>
                <h2 className={`${titleFont.className} ${styles.h2}`}>404</h2>
                <p className={styles.p1}>Whoops! Lo sentimos mucho.</p>
                <p className={styles.p2}>
                    <span>Puedes regresar al </span>
                    <Link href="/"
                          >inicio</Link>
                </p>
            </div>
            <div className={styles.div2}>
                <Image src="/starman_750x750.png"
                       alt="Starman"
                       width={550}
                       height={550}
                />
            </div>

        </div>
    );
};

