export class Substitution {
    date: Date;
    schedule: string;
    newTeacher: string;

    constructor(d: Date, s: string, n: string) {
        this.date = d;
        this.schedule = s;
        this.newTeacher = n;
    }
}
