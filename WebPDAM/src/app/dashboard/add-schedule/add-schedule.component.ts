import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MultiScheduleDto } from 'src/app/controller/dto/multiSchedule-dto';
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

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html'
})
export class AddScheduleComponent implements OnInit {

  scheduleList: Schedule;
  teacherList: UserResponse[];
  classRoomList: Room[];
  gradeList: Grade[];
  subjectList: SubjectResponse[];

  scheduleArrayForm: FormGroup;
  scheduleForm: FormArray;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, public router: Router,
              private teacherService: TeacherService, private roomService: RoomService,
              private gradeService: GradeService, private subjectService: SubjectService) {}

  ngOnInit() {
    this.getData();
    this.scheduleArrayForm = this.fb.group({
      scheduleForm: this.fb.array([this.createSchedule()])
    });
  }

  get formData() { return this.scheduleArrayForm.get('scheduleForm') as FormArray; }

  getData() {
    this.teacherService.getAll().subscribe(t => this.teacherList = t.rows);
    this.roomService.getAll().subscribe(c => this.classRoomList = c.rows);
    this.gradeService.getAll().subscribe(g => this.gradeList = g.rows);
  }

  createSchedule(): FormGroup {
    return this.fb.group({
      timeInterval: [null, Validators.compose([Validators.required])],
      dayOfWeek: [null, Validators.compose([Validators.required])],
      room: [null, Validators.compose([Validators.required])],
      teacher: [null, Validators.compose([Validators.required])],
      grade: [null],
      subject: [null, Validators.compose([Validators.required])],
    });
  }

  addSchedule(): void {
    this.scheduleForm = this.scheduleArrayForm.get('scheduleForm') as FormArray;
    this.scheduleForm.push(this.createSchedule());
  }

  removeLastSchedule(): void {
    this.scheduleForm = this.scheduleArrayForm.get('scheduleForm') as FormArray;
    if (this.scheduleForm.length > 1) {
      this.scheduleForm.removeAt(-1);
    }
  }

  selectGrade(e: string) {
    const query = `filter=${e}`;
    this.subjectService.getAllFiltered(query).subscribe(s => this.subjectList = s.rows);
  }

  submit() {
    const newScheduleArray: MultiScheduleDto = this.scheduleArrayForm.value as MultiScheduleDto;
    this.scheduleService.createMany(newScheduleArray.scheduleForm).subscribe(r => this.router.navigate(['/schedule']),
      e => console.log(e));
  }


}
