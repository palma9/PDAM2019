import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Grade } from 'src/app/controller/model/grade';
import { GradeService } from 'src/app/controller/services/grade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade-dialog',
  templateUrl: './grade-dialog.component.html'
})
export class GradeDialogComponent implements OnInit {

  edit: boolean;
  gradeId: string;
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<GradeDialogComponent>,
              private snackBar: MatSnackBar, private fb: FormBuilder, private gradeService: GradeService,
              private router: Router) { }


  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.gradeId = this.data.grade.id;
    } else {
      this.edit = false;
    }
  }

  onSubmit() {
    if (this.edit) {
      const editedGrade: Grade = this.form.value as Grade;
      this.gradeService.edit(this.gradeId, editedGrade).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => this.snackBar.open('There was an error when were trying to edit this grade.', 'Close', { duration: 3000 }));
    } else {
      const newGrade: Grade = this.form.value as Grade;
      this.gradeService.create(newGrade).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => this.snackBar.open('There was an error when were trying to create this grade.', 'Close', { duration: 3000 }));
    }
  }

  createForm() {
    if (this.data) {
      const editForm: FormGroup = this.fb.group({
        name: [this.data.grade.name, Validators.compose([Validators.required])]
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group({
        name: [null, Validators.compose([Validators.required])]
      });
      this.form = newForm;
    }
  }

  addMany() {
    this.router.navigate(['/addgrades']);
    this.dialogRef.close();
  }
}
