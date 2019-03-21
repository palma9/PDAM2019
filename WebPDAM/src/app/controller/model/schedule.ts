export class Schedule {
    id: string;
    timeInterval: number;
    dayOfWeek: number;
    room: string;
    subject: string;
    teacher: string;

    constructor(id: string, timeInterval: number, dayOfWeek: number, room: string, subject: string, teacher: string) {
        this.id = id;
        this.timeInterval = timeInterval;
        this.dayOfWeek = dayOfWeek;
        this.room = room;
        this.subject = subject;
        this.teacher = teacher;
    }
}
