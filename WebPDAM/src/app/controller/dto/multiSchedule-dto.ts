import { Schedule } from '../model/schedule';

export class MultiScheduleDto {
    scheduleForm: Schedule[];

    constructor(schedules: Schedule[]) {
        this.scheduleForm = schedules;
    }
}