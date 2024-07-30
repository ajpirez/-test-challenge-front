'use server';

import {CustomHeaders} from "@/lib/actions/helpers";
import {BASE_URL} from "@/lib/actions/auth";
import {UserResponse} from "@/lib/interfaces/userResponse";


export async function getStudents({ page = 1, limit = 10 }: { page?: number; limit?: number}) {
    try {
        const requestOptions = await CustomHeaders({
            method: 'GET',
        });
        console.log(`${BASE_URL}/v1/api/user?limit=${limit}&page=${page}`)

        const res = await fetch(`${BASE_URL}/v1/api/user?limit=${limit}&page=${page}`, {
            ...requestOptions,
            cache: 'no-store',
        });

        const data = await res.json();

        if (res.status === 401) {
            return { status: 401, message: data.message };
        }

        if (!res.ok) {
            return { success: false, message: data.message };
        }
        return { data: data as UserResponse, success: true };
    } catch (e: any) {
        console.log(e);
        return { success: false, message: e.message };
    }
}