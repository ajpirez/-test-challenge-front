'use client';
import Link from "next/link";
import {redirect, usePathname, useSearchParams} from "next/navigation";
import styles from '../../styles/pagination.module.scss';
import {generatePaginationNumbers} from "@/lib/utils";

interface Props {
    totalPages: number;
}

export const Pagination = ({totalPages, totalElements, lastPage}: { totalPages: number, totalElements: number, lastPage: number }) => {
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? '1';

    let currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName);
    }

    const allPages = generatePaginationNumbers(currentPage, lastPage);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        if (pageNumber === '...') {
            return `${pathName}/?${params.toString()}`;
        }
        if (+pageNumber <= 0) {
            return `${pathName}`;
        }
        if (+pageNumber > lastPage) {
            return `${pathName}/?${params.toString()}`;
        }
        params.set('page', pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    };

    console.log(totalElements)
    console.log(currentPage)

    return (
        <div className={styles.pagination}>
            <span>Showing <span className={styles.num}>{((currentPage - 1) * 10) + totalElements}</span> out of <span className={styles.num}>{totalPages}</span> entries</span>
            <div className={styles.pages}>
                <Link href={createPageUrl(currentPage - 1)}>Previous</Link>
                {allPages.map((page, index) => (
                    <Link
                        key={page}
                        className={`${page === currentPage ? styles.active : ''}`}
                        href={createPageUrl(page)}
                    >
                        {page}
                    </Link>
                ))}
                <Link href={createPageUrl(currentPage + 1)}>Next</Link>
            </div>
        </div>
    )

};