import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserResponse } from 'src/app/controller/interfaces/user-response';
import { ScheduleResponse } from 'src/app/controller/interfaces/schedule-response';
import { ScheduleService } from 'src/app/controller/services/schedule.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SubstitutionService } from 'src/app/controller/services/substitution.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html'
})
export class AbsenceDialogComponent implements OnInit {

  teacher: UserResponse;
  allSchedules: ScheduleResponse[];

  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AbsenceDialogComponent>,
              private scheduleService: ScheduleService, private substitutionService: SubstitutionService, private fb: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.teacher = this.data.teacher;
    this.doForm();
  }

  doForm() {
    this.form = this.fb.group({
      date: [null, Validators.compose([Validators.required])],
      schedule: [null, Validators.compose([Validators.required])]
    })
  }

  dateChange(e) {
    e.target.value.setHours(1, 0, 0, 0);
    const fecha = new DatePipe('en-US').transform(e.target.value, 'yyyy/MM/dd');
    const query = `teacher=${this.teacher.id}&date=${fecha}&weekday=${e.target.value.getDay()}`;
    this.scheduleService.getOneDayFiltered(query).subscribe(s => this.allSchedules = s);
  }

  onSubmit() {
    this.substitutionService.createAbsence(this.form.value).subscribe(r =>
      this.dialogRef.close('confirm'),
      e => this.snackBar.open('There was an error when were trying to create this subject.', 'Close', { duration: 3000 }));
    }
}
