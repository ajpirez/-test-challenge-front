'use client'
import styles from '../styles/studentTable.module.scss';
import {Element} from "@/lib/interfaces/userResponse";
import {useContext, useState} from "react";
import {ModalContext} from "@/components/providers/Providers";
import Image from "next/image";
import {User} from "@/lib/interfaces/userLogin.interface";
import {useSession} from "next-auth/react";

const EmployeeTable = ({users}: { users: Element[] }) => {
    const {data: session, status} = useSession();
    const {setModalOpen, setStudent} = useContext(ModalContext)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleEdit = (user: User) => {
        setStudent(user)
        setModalOpen('edit')
    }

    const handleDelete = async (user: User) => {
        setStudent(user)
        setModalOpen('delete')
    }
    const handleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user._id));
        }
    };

    const handleCheckboxChange = (id: string) => {
        setSelectedUsers(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(userId => userId !== id)
                : [...prevSelected, id]
        );
    };


    return (
        <div className={styles.tableContainer}>
            <table className={styles.employeeTable}>
                <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectedUsers.length === users.length}
                            onChange={handleSelectAll}
                        />
                    </th>
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
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(user._id)}
                                onChange={() => handleCheckboxChange(user._id)}
                            />
                        </td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.grade}</td>
                        <td>{user.rols.map(rol => rol.type).join(', ')}</td>
                        <td>
                            <button onClick={() => handleEdit(user as User)}
                                    className={styles.edit}><Image width={10}
                                                                   height={10}
                                                                   src="/placeholder-icons/edit-icon.png"
                                                                   alt="Edit"/></button>
                            {
                                session?.user?._id !== user._id && (
                                    <button onClick={() => handleDelete(user as User)}
                                            className={styles.delete}><Image width={10}
                                                                             height={10}
                                                                             src="/placeholder-icons/delete-icon.png"
                                                                             alt="Delete"/>

                                    </button>
                                )
                            }

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;