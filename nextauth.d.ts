import NextAuth,{DefaultSession} from 'next-auth'
declare module 'next-auth' {
    interface Session{
        user:{
            _id:string;
            firstName:string;
            lastName:string;
            email:string;
            rols:string[];
            age:number;
            grade:number;
            image:string;
            access_token:string
        } & DefaultSession['user']
    }
}