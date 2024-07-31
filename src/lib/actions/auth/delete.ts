'use server'


import {DeleteUser} from "@/lib/actions/auth";

export const deleteUser = async (ids: string[]) => {
    try {
        const user = await DeleteUser({ids})

        return {
            ok: true,
            user,
            message: 'Usuario eliminado correctamente.'
        }
    } catch (error) {
        return {
            ok: false,
            message: "No se pudo eliminar el usuario."
        }
    }
}