import {getStudent} from "@/lib/actions/getStudent";
import {User} from "@/lib/interfaces/userLogin.interface";
import StudentInfo from "@/components/student/studentInfo";
import {auth} from "@/auth.config";
import {redirect} from "next/navigation";

interface Props {
    params: {
        id: string
    }
}

export default async function Student({params: {id}}: Props) {

    const session = await auth()
    if(!session?.user){
        redirect('/')
    }
    const user = await getStudent({
        id
    })


    if (!user.success) {
        redirect('/')
    }

    return (
        <StudentInfo user={user.data as User}/>
    );
}