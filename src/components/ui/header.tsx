import styles from '../styles/Header.module.scss';

const Header = () => {
    return (
        <div className={styles.header}>
            <h2>Manage <span>Employees</span></h2>
            <div className={styles.actions}>
                <button className={styles.delete}><img src="/placeholder-icons/delete-icon.png" alt="Delete" /> Delete</button>
                <button className={styles.add}><img src="/placeholder-icons/add-icon.png" alt="Add" /> Add New Employee</button>
            </div>
        </div>
    );
};

export default Header;