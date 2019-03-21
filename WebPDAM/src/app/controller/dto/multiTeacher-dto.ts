import { Teacher } from '../model/teacher';

export class MultiTeacherDto {
    teacherForm: Teacher[];

    constructor(teachers: Teacher[]) {
        this.teacherForm = teachers;
    }
}