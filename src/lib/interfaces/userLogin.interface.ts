export interface userLogin {
    token: string;
    user:  User;
}

export interface User {
    _id:       string;
    firstName: string;
    lastName:  string;
    email:     string;
    password?: string;
    age:       number;
    grade:     number;
    rols:      Rol[];
}


export interface Rol {
    _id:    string;
    type:   string;
    UserId: string;
    __v:    number;
}