'use server'


export const registerUser = async (name:string, email:string, password:string) => {
    try {
        //server action create user
        // const user = await prisma.user.create({
        //     data: {
        //         name,
        //         email,
        //         password: await bcryptjs.hash(password, 10),
        //     },
        //     select:{
        //         id: true,
        //         name: true,
        //         email: true
        //     }
        // })
        return {
            ok: true,
            // user,
            message: 'Usuario creado correctamente.'
        }
    }catch (error){
        return{
            ok:false,
            message: "No se pudo crear el usuario."
        }
    }
}