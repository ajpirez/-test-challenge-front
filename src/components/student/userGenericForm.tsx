'use client'

import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {registerUser} from "@/lib/actions/auth/register";
import {login} from "@/lib/actions/auth/login";
import styles from "../styles/UserGenericForm.module.scss";
import {User} from "@/lib/interfaces/userLogin.interface";
import {customRevalidateTag, RevalidatePath} from "@/lib/actions/helpers";
import {ErrorContext, LoaderContext, ModalContext} from "@/components/providers/Providers";
import {editUser} from "@/lib/actions/auth/edit";
import {useMounted} from "@/components/hooks/useMounted";
import Image from "next/image";
import {log} from "node:util";
import {revalidatePath} from "next/cache";
import {useSearchParams} from "next/navigation";

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

    const {setError} = useContext(ErrorContext)

    const {setModalOpen} = useContext(ModalContext)

    const {setLoading} = useContext(LoaderContext)

    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const searchParams = useSearchParams()

    const pageString = searchParams.get('page') ?? 1


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
            setLoading(false)
            setErrorMessage(resp.message)
            setError(resp.message)
            return
        }
        reset();
        if (type === 'register') {
            await login(email.toLowerCase(), password)
            window.location.replace('/')
        } else {
            setModalOpen(null)
            await RevalidatePath(`/page=${pageString}`)
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

                <label htmlFor="firstName">Nombre Completo</label>
                <input
                    id="firstName"
                    className={`${styles.input} ${errors.firstName ? styles.error : ''} `}
                    type="text"
                    autoFocus
                    {...register("firstName", {
                        required: "El nombre es obligatorio",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres"
                        },
                        pattern: {
                            value: /^[a-zA-Z\s]+$/,
                            message: "El nombre solo puede contener letras y espacios"
                        }
                    })}
                />
                {
                    errors.firstName && (
                        <p className={styles.color}>{ errors.firstName.message}</p>
                    )
                }
                <label htmlFor="lastName">Apellidos</label>
                <input
                    id="lastName"
                    className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
                    type="text"
                    autoFocus
                    {...register("lastName", {
                        required: false,
                        minLength: {
                            value: 3,
                            message: "El apellido debe tener al menos 3 caracteres"
                        }
                    })}
                />
                {errors.lastName && (
                    <p className={styles.color}>{errors.lastName.message}</p>
                )}

                {
                    type !== 'edit' && (
                        <>
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                id="email"
                                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                                type="email"
                                {...register("email", {
                                    required: "El correo electrónico es obligatorio",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "El correo electrónico no es válido"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className={styles.color}>{errors.email.message}</p>
                            )}
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
                                    id="password"
                                    className={`${styles.input} ${errors.password ? styles.error : ''}`}
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 3,
                                            message: "La contraseña debe tener al menos 3 caracteres"
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <p className={styles.color}>{errors.password.message}</p>
                                )}
                            </div>
                        </>
                    )
                }

                <label htmlFor="age">Edad</label>
                <input
                    min={6}
                    id="age"
                    className={`${styles.input} ${errors.age ? styles.error : ''}`}
                    type="number"
                    {...register("age", {
                        required: false, // No es obligatorio, por lo que no necesitas un mensaje para required
                        min: {
                            value: 6,
                            message: "La edad debe ser al menos 6 años"
                        }
                    })}
                />
                {errors.age && (
                    <p className={styles.color}>{errors.age.message}</p>
                )}

                <label htmlFor="grade">Grado</label>
                <input
                    id="grade"
                    className={`${styles.range} ${errors.grade ? styles.error : ''}`}
                    type="range"
                    min={1}
                    max={5}
                    defaultValue={1}
                    {...register("grade", {
                        required: false,
                        min: {
                            value: 1,
                            message: "El grado debe ser al menos 1"
                        },
                        max: {
                            value: 5,
                            message: "El grado no puede ser mayor que 5"
                        }
                    })}
                />
                {errors.grade && (
                    <p className={styles.color}>{errors.grade.message}</p>
                )}
                <span className={styles.range}>{grade}</span>

                {
                    <span className="text-red-500">{errorMessage}</span>
                }

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