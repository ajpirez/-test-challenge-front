'use server';

import {CustomHeaders} from "@/lib/actions/helpers";
import {BASE_URL} from "@/lib/actions/auth";
import {User} from "@/lib/interfaces/userLogin.interface";


export async function getStudent({id}: { id:string }) {
    try {
        const requestOptions = await CustomHeaders({
            method: 'GET',
        });


        const res = await fetch(`${BASE_URL}/v1/api/user/${id}`, {
            ...requestOptions,
            cache: 'no-store',
            next: { tags: ['getUser'] },
        });

        const data = await res.json();

        if (res.status === 401) {
            return {status: 401, message: data.message};
        }

        if (data.status) {
            return {success: false, message: data.message};
        }
        return {data: data as User, success: true};
    } catch (e: any) {
        console.log(e);
        return {success: false, message: e.message};
    }
}