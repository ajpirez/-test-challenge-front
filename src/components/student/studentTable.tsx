import styles from '../styles/studentTable.module.scss';
import {Element} from "@/lib/interfaces/userResponse";
import {PaginationResult} from "@/lib/interfaces/userResponse";

const EmployeeTable = async ({users}: { users: Element[] }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.employeeTable}>
                <thead>
                <tr>
                    <th><input type="checkbox"/></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Grade</th>
                    <th>Rols</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td><input type="checkbox"/></td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.grade}</td>
                        <td>{user.rols.map(rol => rol.type).join(', ')}</td>
                        <td>
                            <button className={styles.edit}><img src="/placeholder-icons/edit-icon.png"
                                                                 alt="Edit"/></button>
                            <button className={styles.delete}><img src="/placeholder-icons/delete-icon.png"
                                                                   alt="Delete"/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;