export class RegisterDto {
    name: string;
    email: string;
    password: string;

    constructor(n: string, e: string, p: string) {
        this.name = n;
        this.email = e;
        this.password = p;
    }
}
