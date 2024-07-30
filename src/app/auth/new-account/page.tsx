import RegisterForm from "@/app/auth/new-account/ui/RegisterForm";
import styles from './styles/Page.module.scss'
import {titleFont} from "@/config/font";

export default function Register() {
    return (
        <div className={styles.container}>
            <h1 className={`${titleFont.className} ${styles.fontStyle}`}>Registrar Cuenta</h1>
            <RegisterForm type="register"/>
        </div>
    );
}