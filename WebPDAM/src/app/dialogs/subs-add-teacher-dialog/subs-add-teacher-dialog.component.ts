import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubstitutionResponse } from 'src/app/controller/interfaces/substitution-response';
import { UserResponse } from 'src/app/controller/interfaces/user-response';
import { ScheduleService } from 'src/app/controller/services/schedule.service';
import { SubstitutionService } from 'src/app/controller/services/substitution.service';
import { TeacherService } from 'src/app/controller/services/teacher.service';

@Component({
  selector: 'app-subs-add-teacher-dialog',
  templateUrl: './subs-add-teacher-dialog.component.html'
})
export class SubsAddTeacherDialogComponent implements OnInit {

  guardTeacherList: UserResponse[];

  form: FormGroup;
  substitution: SubstitutionResponse;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SubsAddTeacherDialogComponent>,
              private fb: FormBuilder, private teacherService: TeacherService, private substitutionService: SubstitutionService) { }

  ngOnInit() {
    this.substitution = this.data.sub;
    this.createForm();
    this.getGuardTeacherList();
  }

  createForm() {
    this.form = this.fb.group({
      date: [this.substitution.date, Validators.compose([Validators.required])],
      schedule: [this.substitution.schedule.id, Validators.compose([Validators.required])],
      newTeacher: [null, Validators.compose([Validators.required])]
    });
  }

  getGuardTeacherList() {
    const weekDay = this.substitution.schedule.dayOfWeek;
    const timeInterval = this.substitution.schedule.timeInterval;
    const date = this.substitution.date;
    const query = `weekday=${weekDay}&timeInterval=${timeInterval}&date=${date}`;
    this.teacherService.getGuardTeachers(query).subscribe(r => this.guardTeacherList = r);
  }

  onSubmit() {
    const data = this.form.value;
    this.substitutionService.edit(this.substitution.id, data).subscribe(r => this.dialogRef.close('confirm'));
  }

}
