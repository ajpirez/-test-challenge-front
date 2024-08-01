'use client'

import Link from "next/link";
import {useFormState, useFormStatus} from 'react-dom'
import {useContext, useEffect, useState} from "react"
import {authenticate} from "@/lib/actions/auth/login";
import styles from './styles/LoginForm.module.scss'
import {ErrorContext} from "@/components/providers/Providers";
import Image from "next/image";

const LoginForm = () => {
    const {
        setError
    } = useContext(ErrorContext)
    const [showPassword, setShowPassword] = useState(false)
    let [state, dispatch] = useFormState(authenticate, undefined)


    useEffect(() => {
        if (state === "Success") {
            window.location.replace('/')
        } else {
            setError(state)
        }

    }, [setError, state]);


    return (
        <form action={dispatch}
              className={styles.form}>

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
            />

            <label htmlFor="password">Contraseña</label>
            <div className={styles.passdiv}>
                <button
                    className={styles.button}
                    type="button"
                    onClick={() => setShowPassword(show => !show)}>{showPassword ?
                    <Image src="/hiden.png"
                                                                                          height={10}
                                                                                          width={10}
                                                                                          alt="hide"/> :
                    <Image src="/ojo.png"
                           height={10}
                           width={10}
                           alt="show"/>}</button>
                <input
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                />
            </div>

            <div
                className={styles.divCredentials}
                aria-live="polite"
                aria-atomic="true"
            >
                {state === "CredentialsSignin" && (
                    <div className={styles.divCredentials}>
                        <p className={styles.p}>Invalid credentials</p>
                    </div>
                )}
            </div>

            <PendingButton/>


            {/* divisor l ine */}
            <div className={styles.divider}>
                <div></div>
                <div>O</div>
                <div></div>
            </div>

            <Link
                href="/auth/new-account"
                className={styles.buttonIngresar}>
                Crear una nueva cuenta
            </Link>

        </form>
    );
};

export default LoginForm;

function PendingButton() {
    const {pending} = useFormStatus();

    return (
        <button
            type="submit"
            className={`${pending ? styles.secondary : styles.primary}`}
            disabled={pending}
        >
            Ingresar
        </button>
    );
}