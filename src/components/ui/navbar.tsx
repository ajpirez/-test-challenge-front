'use client'
import { useSession, signOut } from 'next-auth/react';
import styles from '../styles/Navbar.module.scss';
import { useEffect, useState } from 'react';
import { useMounted } from '@/components/hooks/useMounted';

const Navbar = () => {
    const m = useMounted();
    const { data: session, status } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log('entro')
        setIsAuthenticated(!!session);
    }, [isAuthenticated, session]);




    const logoutUser = async () => {
        await signOut();
        setIsAuthenticated(false);
    };
    if (!isAuthenticated) return null;
    if (!m) {
        return null;
    }
    return (
        <nav className={styles.nav}>
            <ul>
                {isAuthenticated && (
                    <li>
                        <button onClick={() => logoutUser()}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
