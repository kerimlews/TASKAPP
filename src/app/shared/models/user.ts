import { ERoles } from '../enums/roles.enum';

export class User {
    id: string;
    email: string;
    password: string;
    roles: ERoles[];

    constructor(id: string, email: string, password: string, roles: ERoles[]) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
