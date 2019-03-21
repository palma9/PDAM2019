import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/controller/model/teacher';
import { User } from 'src/app/controller/model/user';
import { TeacherService } from 'src/app/controller/services/teacher.service';
import { UserService } from 'src/app/controller/services/user.service';

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html'
})
export class TeacherDialogComponent implements OnInit {

  edit: boolean;
  teacherId: string;
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TeacherDialogComponent>,
              private snackBar: MatSnackBar, private fb: FormBuilder, private userService: UserService,
              private teacherService: TeacherService, private router: Router) { }


  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.teacherId = this.data.teacher.id;
    } else {
      this.edit = false;
    }
  }

  onSubmit() {
    if (this.edit) {
      const editedTeacher: User = this.form.value as User;
      this.userService.edit(this.teacherId, editedTeacher).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => this.snackBar.open('There was an error when were trying to edit this teacher.', 'Close', { duration: 3000 }));
    } else {
      const newTeacher: Teacher = this.form.value as Teacher;
      this.teacherService.createTeacher(newTeacher).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => this.snackBar.open('There was an error when were trying to create this teacher.', 'Close', { duration: 3000 }));
    }
  }

  createForm() {
    if (this.data) {
      const editForm: FormGroup = this.fb.group({
        name: [this.data.teacher.name, Validators.compose([Validators.required])],
        email: [this.data.teacher.email, Validators.compose([Validators.required])],
        picture: [this.data.teacher.picture, Validators.compose([Validators.required])],
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group({
        name: [null, Validators.compose([Validators.required])],
        email: [null, Validators.compose([Validators.required])],
        number: [null, Validators.compose([Validators.required])],
      });
      this.form = newForm;
    }
  }

  addMany() {
    this.router.navigate(['/addteachers']);
    this.dialogRef.close();
  }
}
