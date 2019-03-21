import { Grade } from '../model/grade';

export class MultiGradeDto {
    gradeForm: Grade[];

    constructor(grades: Grade[]) {
        this.gradeForm = grades;
    }
}