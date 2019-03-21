export class Teacher {
    email: string;
    password: string;
    name: string;
    number: number;
    school: string;

    constructor(email: string, password: string, name: string, number: number, school: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.number = number;
        this.school = school;
    }
}
