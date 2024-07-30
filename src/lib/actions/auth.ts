import { CustomHeaders } from '@/lib/actions/helpers';
import {User, userLogin} from "@/lib/interfaces/userLogin.interface";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const requestOptions = await CustomHeaders({
      method: 'POST',
      body: JSON.stringify({ email, password}),
      contentType: 'application/json',
      isSecurePath: false,
    });

    const res = await fetch(`${BASE_URL}/v1/api/auth/signin`, requestOptions);
    if (!res.ok) {
      const resp = await res.json();
      throw resp.error.message;
    }
    const data = await res.json();
    return data as userLogin;
  } catch (error) {
    throw new Error('error');
  }
};


export const RegisterUser = async ({ firstName,lastName,email, password,age,grade }: {firstName: string, lastName: string, email: string, password: string, age: number, grade: number }) => {
  try {
    const requestOptions = await CustomHeaders({
      method: 'POST',
      body: JSON.stringify({ firstName,lastName,email, password,age,grade}),
      contentType: 'application/json',
      isSecurePath: false,
    });

    const res = await fetch(`${BASE_URL}/v1/api/auth/signup`, requestOptions);
    if (!res.ok) {
      const resp = await res.json();
      throw resp.error.message;
    }
    const data = await res.json();
    return data as User;
  } catch (error) {
    throw new Error('error');
  }
};

export const EditUser = async ({ id, firstName,lastName,age,grade }: {id: string,firstName: string, lastName: string, age: number, grade: number }) => {
  try {
    const requestOptions = await CustomHeaders({
      method: 'PATCH',
      body: JSON.stringify({ firstName,lastName,age,grade}),
      contentType: 'application/json',
      isSecurePath: true,
    });
    console.log(`${BASE_URL}/v1/api/user/${id}`)
    const res = await fetch(`${BASE_URL}/v1/api/user/${id}`, requestOptions);
    if (!res.ok) {
      const resp = await res.json();
      throw resp.error.message;
    }
    const data = await res.json();
    return data as User;
  } catch (error) {
    throw new Error('error');
  }
};

export const DeleteUser = async ({ id}: {id: string}) => {
  try {
    const requestOptions = await CustomHeaders({
      method: 'DELETE',
      contentType: 'application/json',
      isSecurePath: true,
    });
    console.log(`${BASE_URL}/v1/api/user/${id}`)
    const res = await fetch(`${BASE_URL}/v1/api/user/${id}`, requestOptions);
    if (!res.ok) {
      const resp = await res.json();
      throw resp.error.message;
    }
    const data = await res.json();
    return data as User;
  } catch (error) {
    throw new Error('error');
  }
};
