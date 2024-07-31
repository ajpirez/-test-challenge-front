import {CustomHeaders} from '@/lib/actions/helpers';
import {User, userLogin} from "@/lib/interfaces/userLogin.interface";
import {ErrorResponse} from '@/lib/interfaces/error.interface'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const loginUser = async ({email, password}: { email: string; password: string }) => {
    try {
        const requestOptions = await CustomHeaders({
            method: 'POST',
            body: JSON.stringify({email, password}),
            contentType: 'application/json',
            isSecurePath: false,
        });

        const res = await fetch(`${BASE_URL}/v1/api/auth/signin`, requestOptions);
        const data = await res.json();
        if (data.status) {
            return data
        }
        return data as User
    } catch (error) {
        throw new Error('error');
    }
};


export const RegisterUser = async ({firstName, lastName, email, password, age, grade}: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    age: number,
    grade: number
}) => {
    try {
        const requestOptions = await CustomHeaders({
            method: 'POST',
            body: JSON.stringify({firstName, lastName, email, password, age, grade}),
            contentType: 'application/json',
            isSecurePath: false,
        });

        const res = await fetch(`${BASE_URL}/v1/api/auth/signup`, requestOptions);
        const data = await res.json();
        if (data.status) {
            return data
        }
        return data
    } catch (error) {
        throw new Error('error');
    }
};

export const EditUser = async ({id, firstName, lastName, age, grade}: {
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    grade: number
}) => {
    try {
        const requestOptions = await CustomHeaders({
            method: 'PATCH',
            body: JSON.stringify({firstName, lastName, age, grade}),
            contentType: 'application/json',
            isSecurePath: true,
        });
        const res = await fetch(`${BASE_URL}/v1/api/user/${id}`, requestOptions);
        const data = await res.json();
        if (data.status) {
            return data
        }
        return data as User;
    } catch (error) {
        throw new Error('error');
    }
};

export const DeleteUser = async ({ids}: { ids: string[] }) => {
    try {
        const requestOptions = await CustomHeaders({
            method: ids.length > 1 ? 'POST' : 'DELETE',
            contentType: 'application/json',
            ...(ids.length > 1 && {body: JSON.stringify({ids})}),
            isSecurePath: true,
        });

        const url = ids.length > 1 ? `${BASE_URL}/v1/api/user/delete-ids` : `${BASE_URL}/v1/api/user/${ids[0]}`;

        const res = await fetch(url, requestOptions);
        const data = await res.json();
        if (data.status) {
            return data
        }
        return data as User;
    } catch (error) {
        throw new Error('error');
    }
};
