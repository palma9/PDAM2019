import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Subject } from 'src/app/controller/model/subject';
import { SubjectService } from 'src/app/controller/services/subject.service';
import { GradeService } from 'src/app/controller/services/grade.service';
import { Grade } from 'src/app/controller/model/grade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html'
})
export class SubjectDialogComponent implements OnInit {

  gradeList: Grade[];
  edit: boolean;
  subjectId: string;
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SubjectDialogComponent>,
              private snackBar: MatSnackBar, private fb: FormBuilder, private subjectService: SubjectService,
              private gradeService: GradeService, private router: Router) { }


  ngOnInit() {
    this.getAllGrades();
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.subjectId = this.data.subject.id;
    } else {
      this.edit = false;
    }
  }

  getAllGrades() {
    this.gradeService.getAll().subscribe(r => this.gradeList = r.rows);
  }

  onSubmit() {
    if (this.edit) {
      const editedSubject: Subject = this.form.value as Subject;
      this.subjectService.edit(this.subjectId, editedSubject).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => this.snackBar.open('There was an error when were trying to edit this subject.', 'Close', { duration: 3000 }));
    } else {
      const newSubject: Subject = this.form.value as Subject;
      this.subjectService.create(newSubject).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => this.snackBar.open('There was an error when were trying to create this subject.', 'Close', { duration: 3000 }));
    }
  }

  createForm() {
    if (this.data) {
      const editForm: FormGroup = this.fb.group({
        name: [this.data.subject.name, Validators.compose([Validators.required])],
        grade: [this.data.subject.grade.id, Validators.compose([Validators.required])]
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group({
        name: [null, Validators.compose([Validators.required])],
        grade: [null, Validators.compose([Validators.required])]
      });
      this.form = newForm;
    }
  }

  addMany() {
    this.router.navigate(['/addsubjects']);
    this.dialogRef.close();
  }
}
