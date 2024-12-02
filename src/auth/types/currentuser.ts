import { Role } from "../../constant/Role.enum";


export type CurrentUser = {
    id: number;
    username:string;
    email:string;
    role: Role;
};