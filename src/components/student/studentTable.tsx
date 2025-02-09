'use client'
import styles from '../styles/studentTable.module.scss';
import {Element} from "@/lib/interfaces/userResponse";
import {useContext, useEffect} from "react";
import {ModalContext} from "@/components/providers/Providers";
import Image from "next/image";
import {User} from "@/lib/interfaces/userLogin.interface";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";

const EmployeeTable = ({users, page}: { users: Element[], page: string }) => {
    const router = useRouter()
    const {data: session, status} = useSession();
    const {setModalOpen, setStudent, selectedIdUsers, setSelectedIdUsers} = useContext(ModalContext)


    useEffect(() => {
        if (!users.length) {
            router.replace(`/?page=${+page === 1 ? 1 : +page - 1}`)
        }
    }, [page, router, users]);

    const handleEdit = (user: User) => {
        setStudent(user)
        setModalOpen('edit')
    }

    const handleDelete = async (user: User) => {
        setSelectedIdUsers([user._id])
        setModalOpen('delete')
    }
    const handleSelectAll = () => {
        const filteredUsers = users.filter(user => user._id !== session?.user._id);
        if (selectedIdUsers.length === filteredUsers.length) {
            setSelectedIdUsers([]);
        } else {
            setSelectedIdUsers(filteredUsers.map(user => user._id));
        }
    };

    const handleCheckboxChange = (id: string) => {
        if (id === session?.user._id) {
            return;
        }
        setSelectedIdUsers(prevSelected =>
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
                            checked={selectedIdUsers.length === users.filter(user => user._id !== session?.user._id).length}
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
                            {
                                session?.user?._id !== user._id && (
                                    <input
                                        type="checkbox"
                                        checked={selectedIdUsers.includes(user._id)}
                                        onChange={() => handleCheckboxChange(user._id)}
                                    />
                                )
                            }
                        </td>
                        <td className={styles.truncate}>
                            <Link href={`/student/${user._id}?page=${!page ? '1' : page}`}>{user.firstName}</Link></td>
                        <td className={styles.truncate}>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.grade}</td>
                        <td>{user.rols.map(rol => rol.type).join(', ')}</td>
                        <td>
                            <button onClick={() => handleEdit(user as User)}
                                    className={styles.edit}><Image width={10}
                                                                   height={10}
                                                                   src="/lapiz.png"
                                                                   alt="Edit"/></button>
                            {
                                session?.user?._id !== user._id && (
                                    <button onClick={() => handleDelete(user as User)}
                                            className={styles.delete}><Image width={10}
                                                                             height={10}
                                                                             src="/borrar.png"
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