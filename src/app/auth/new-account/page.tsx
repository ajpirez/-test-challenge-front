import UserGenericForm from "@/components/student/userGenericForm";
import styles from './styles/Page.module.scss'
import {titleFont} from "@/config/font";

export default function Register() {
    return (
        <div className={styles.container}>
            <h1 className={`${titleFont.className} ${styles.fontStyle}`}>Registrar Cuenta</h1>
            <UserGenericForm type="register"/>
        </div>
    );
}