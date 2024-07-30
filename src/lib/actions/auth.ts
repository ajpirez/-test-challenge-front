import { CustomHeaders } from '@/lib/actions/helpers';
import {userLogin} from "@/lib/interfaces/userLogin.interface";

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
    console.log({data})
    return data as userLogin;
  } catch (error) {
    throw new Error('error');
  }
};