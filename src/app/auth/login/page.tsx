import {titleFont} from "@/config/font";
import LoginForm from "@/app/auth/login/ui/loginForm";
import styles from './styles/Page.module.scss'


export default function Login() {
    return (
        <div className={styles.container}>
            <h1 className={`${titleFont.className} ${styles.fontStyle}`}>Ingresar</h1>
           <LoginForm/>
        </div>
    );
}