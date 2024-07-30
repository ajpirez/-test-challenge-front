'use server'


import {RegisterUser} from "@/lib/actions/auth";

export const registerUser = async (firstName: string, lastName: string, email: string, password: string, age: number, grade: number) => {
    try {
        const user = await RegisterUser({firstName, lastName, email, password, age, grade})

        return {
            ok: true,
            user,
            message: 'Usuario creado correctamente.'
        }
    } catch (error) {
        return {
            ok: false,
            message: "No se pudo crear el usuario."
        }
    }
}