import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { SubjectResponse } from 'src/app/controller/interfaces/subject-response';
import { UserResponse } from 'src/app/controller/interfaces/user-response';
import { Grade } from 'src/app/controller/model/grade';
import { Room } from 'src/app/controller/model/room';
import { Schedule } from 'src/app/controller/model/schedule';
import { GradeService } from 'src/app/controller/services/grade.service';
import { RoomService } from 'src/app/controller/services/room.service';
import { ScheduleService } from 'src/app/controller/services/schedule.service';
import { SubjectService } from 'src/app/controller/services/subject.service';
import { TeacherService } from 'src/app/controller/services/teacher.service';
import { ScheduleResponse } from 'src/app/controller/interfaces/schedule-response';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html'
})
export class ScheduleDialogComponent implements OnInit {

  edit: boolean;
  scheduleId: string;
  form: FormGroup;

  teacherList: UserResponse[];
  classRoomList: Room[];
  gradeList: Grade[];
  subjectList: SubjectResponse[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ScheduleDialogComponent>,
              private snackBar: MatSnackBar, private fb: FormBuilder, private scheduleService: ScheduleService,
              private teacherService: TeacherService, private roomService: RoomService,
              private gradeService: GradeService, private subjectService: SubjectService) { }

  ngOnInit() {
    this.createForm();
    this.getData();
    if (this.data.schedule) {
      this.edit = true;
      this.scheduleId = this.data.schedule.id;
      this.selectGrade(this.data.schedule.subject.grade.id);
    } else {
      this.edit = false;
    }
  }

  getData() {
    this.teacherService.getAll().subscribe(t => this.teacherList = t.rows);
    this.roomService.getAll().subscribe(c => this.classRoomList = c.rows);
    this.gradeService.getAll().subscribe(g => this.gradeList = g.rows);
  }

  selectGrade(e: string) {
    console.log(this.data.schedule);
    const query = `filter=${e}`;
    this.subjectService.getAllFiltered(query).subscribe(s => this.subjectList = s.rows);
  }

  onSubmit() {
    if (this.edit) {
      const editedSchedule: Schedule = this.form.value as Schedule;
      this.scheduleService.edit(this.scheduleId, editedSchedule).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => this.snackBar.open('There was an error when were trying to edit this schedule.', 'Close', { duration: 3000 }));
    } else {
      const newSchedule: Schedule = this.form.value as Schedule;
      this.scheduleService.create(newSchedule).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => this.snackBar.open('There was an error when were trying to create this schedule.', 'Close', { duration: 3000 }));
    }
  }

  createForm() {
    if (this.data.schedule) {
      const editForm: FormGroup = this.fb.group({
        timeInterval: [this.data.schedule.timeInterval, Validators.compose([Validators.required])],
        dayOfWeek: [this.data.schedule.dayOfWeek, Validators.compose([Validators.required])],
        room: [this.data.schedule.room.id, Validators.compose([Validators.required])],
        subject: [this.data.schedule.subject.id, Validators.compose([Validators.required])],
        teacher: [this.data.schedule.teacher.id, Validators.compose([Validators.required])],
        grade: [this.data.schedule.subject.grade.id]
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group({
        timeInterval: [this.data.time, Validators.compose([Validators.required])],
        dayOfWeek: [this.data.day, Validators.compose([Validators.required])],
        room: [null, Validators.compose([Validators.required])],
        subject: [null, Validators.compose([Validators.required])],
        teacher: [null, Validators.compose([Validators.required])],
        grade: [null]
      });
      this.form = newForm;
    }
  }

  delete(schedule: ScheduleResponse) {
    this.scheduleService.delete(schedule.id).subscribe(r => this.dialogRef.close('confirm'),
    e => this.snackBar.open('There was an error when were trying to create this schedule.', 'Close', { duration: 3000 }));
  }
}
