import { Role } from "../../constant/Role.enum"

export type AuthJwtPayload={
    id: number;
    username:string;
    email:string;
    role: Role;
}