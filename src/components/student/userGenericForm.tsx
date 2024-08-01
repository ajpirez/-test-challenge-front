'use client'

import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {registerUser} from "@/lib/actions/auth/register";
import {login} from "@/lib/actions/auth/login";
import styles from "../styles/UserGenericForm.module.scss";
import {User} from "@/lib/interfaces/userLogin.interface";
import {customRevalidateTag} from "@/lib/actions/helpers";
import {ErrorContext, LoaderContext, ModalContext} from "@/components/providers/Providers";
import {editUser} from "@/lib/actions/auth/edit";
import {useMounted} from "@/components/hooks/useMounted";
import {useRouter} from "next/navigation";
import Image from "next/image";

type FormInputs = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    age: number
    grade: number
}

const UserGenericForm = ({type, externalData}: { type?: 'add' | 'edit' | 'register', externalData?: User | null }) => {
    const m = useMounted();
    const router = useRouter()

    const {setError} = useContext(ErrorContext)

    const {setModalOpen} = useContext(ModalContext)

    const {setLoading} = useContext(LoaderContext)

    const [showPassword, setShowPassword] = useState(false)



    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<FormInputs>({
        defaultValues: {
            id: externalData?._id || '',
            firstName: externalData?.firstName || '',
            lastName: externalData?.lastName || '',
            email: externalData?.email || '',
            password: externalData?.password || '',
            age: externalData?.age || 6,
            grade: externalData?.grade || 1,
        }
    })


    useEffect(() => {
        if (externalData) {
            reset({
                id: externalData?._id || '',
                firstName: externalData?.firstName || '',
                lastName: externalData?.lastName || '',
                email: externalData?.email || '',
                password: externalData?.password || '',
                age: externalData?.age || 6,
                grade: externalData?.grade || 1,
            });
        }
    }, [externalData, reset]);



    const grade = watch('grade');

    const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
        setLoading(true)
        const {id, firstName, lastName, email, password, age, grade} = data

        const action = {
            add: () => registerUser(firstName, lastName, email, password, age, grade),
            edit: () => editUser(id!, firstName, lastName, age, grade),
            register: () => registerUser(firstName, lastName, email, password, age, grade),
        }

        const resp = await action[type as keyof typeof action]()
        if (!resp.ok) {
            setError(resp.message)
            setLoading(false)
            return
        }
        reset();
        if (type === 'register') {
            await login(email.toLowerCase(), password)
            window.location.replace('/')
        } else {
            setModalOpen(null)
            await customRevalidateTag('getUsers');
        }
        setLoading(false)
    }

    if (!m) {
        return null;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={styles.form}>

                <label htmlFor="name">Nombre Completo</label>
                <input
                    className={`${styles.input} ${errors.firstName ? styles.error : ''} `}
                    type="text"
                    autoFocus
                    {...register("firstName", {required: true, minLength: 3})}
                />
                <label htmlFor="lastName">Apellidos</label>
                <input
                    className={`${styles.input} ${errors.lastName ? styles.error : ''} `}
                    type="text"
                    autoFocus
                    {...register("lastName", {required: false, minLength: 3})}
                />

                {
                    type !== 'edit' && (
                        <>
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                className={`${styles.input} ${errors.email ? styles.error : ''} `}
                                type="email"
                                {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
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
                                    className={`${styles.input} ${errors.password ? styles.error : ''} `}
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    {...register("password", {required: true, minLength: 3})}
                                />
                            </div>
                        </>
                    )
                }

                <label htmlFor="age">Edad</label>
                <input
                    min={6}
                    className={`${styles.input} ${errors.age ? styles.error : ''} `}
                    type="number"
                    {...register("age", {required: false, min: 6})}
                />

                <label htmlFor="grade">Grado</label>
                <input
                    className={`${styles.range} ${errors.grade ? styles.error : ''} `}
                    type="range"
                    min={1}
                    max={5}
                    defaultValue={1}
                    {...register("grade", {required: false, min: 1, max: 5})}
                />
                <span className={styles.range}>{grade}</span>

                <button
                    className={styles.buttonIngresar}>
                    {
                        type === 'edit' ? 'Editar cuenta' : 'Crear cuenta'
                    }
                </button>


                {
                    type === 'register' &&
                    <>
                        {/* divisor l ine */}
                        <div className={styles.divider}>
                            <div></div>
                            <div>O</div>
                            <div></div>
                        </div>
                        <Link
                            href="/auth/login"
                            className={styles.buttonIngresar}>
                            Ingresar
                        </Link>
                    </>
                }

            </form>
        </>


    );
};

export default UserGenericForm;