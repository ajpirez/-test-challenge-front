import {checkPositiveInteger} from "@/lib/utils";
import {getStudents} from "@/lib/actions/getStudents";
import Header from "@/components/ui/header";
import EmployeeTable from "@/components/student/studentTable";
import HandleSignOut from "@/components/HandleSignOut";
import {Pagination} from "@/components/ui/pagination/pagination";

export default async function Page(props: { params: {}; searchParams: { page: string } }) {

    const users = await getStudents({
        page: +checkPositiveInteger(props.searchParams.page, 1, 1000000, '1'),
        limit: +checkPositiveInteger(props.searchParams.page, 10, 100, '10'),
    })


    return (
        <main>
            <HandleSignOut status={users?.status ?? 200}/>
            <Header/>
            <EmployeeTable users={users?.data?.elements ?? []}
                           page={props.searchParams.page}/>
            <Pagination totalPages={users?.data?.paginationResult?.totalElements ?? 0}
                        totalElements={users?.data?.elements?.length ?? 0}
                        lastPage={users?.data?.paginationResult?.lastPage ?? 1}/>
        </main>
    );
}
