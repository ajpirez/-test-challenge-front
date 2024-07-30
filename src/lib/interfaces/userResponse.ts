export interface UserResponse {
    elements:         Element[];
    paginationResult: PaginationResult;
}

export interface Element {
    _id:       string;
    firstName: string;
    lastName:  string;
    email:     string;
    age?:      number;
    grade?:    number;
    rols:      Rol[];
}

export interface Rol {
    _id:    string;
    type:   string;
    UserId: string;
    __v:    number;
}

export interface PaginationResult {
    totalElements: number;
    hasNextPage:   boolean;
    nextPage:      number;
    previousPage:  number;
    lastPage:      number;
}
