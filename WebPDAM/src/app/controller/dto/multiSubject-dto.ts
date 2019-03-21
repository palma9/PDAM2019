import { Subject } from '../model/subject';

export class MultiSubjectDto {
    subjectForm: Subject[];

    constructor(subjects: Subject[]) {
        this.subjectForm = subjects;
    }
}
