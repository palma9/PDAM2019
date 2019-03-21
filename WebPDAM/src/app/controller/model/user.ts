export class User {
    email: string;
    name: string;
    password: string;
    securityCode: string;

    constructor(email: string, name: string, password: string, securityCode: string) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.securityCode = securityCode;
    }
}
