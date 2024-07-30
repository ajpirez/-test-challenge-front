'use client'

import Link from "next/link";
import {useFormState, useFormStatus} from 'react-dom'
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation";
import {authenticate} from "@/lib/actions/auth/login";
import styles from './styles/LoginForm.module.scss'

const LoginForm = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [state, dispatch] = useFormState(authenticate, undefined)


    useEffect(() => {
        if (state === "Success") {
            window.location.replace('/')
        }
    }, [router, state]);

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
                    onClick={() => setShowPassword(show => !show)}>{showPassword ? 'hidde' : 'show'}</button>
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
                    <div className="flex m-auto mb-2">
                        {/*<IoInformationOutline className="h-5 w-5 text-red-500"/>*/}
                        <p className="text-sm text-red-500">Invalid credentials</p>
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