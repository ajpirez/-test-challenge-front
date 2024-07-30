'use server'


import {EditUser} from "@/lib/actions/auth";

export const editUser = async (id: string, firstName: string, lastName: string, age: number, grade: number) => {
    try {
        const user = await EditUser({id,firstName, lastName, age, grade})

        return {
            ok: true,
            user,
            message: 'Usuario editado correctamente.'
        }
    } catch (error) {
        return {
            ok: false,
            message: "No se pudo editar el usuario."
        }
    }
}