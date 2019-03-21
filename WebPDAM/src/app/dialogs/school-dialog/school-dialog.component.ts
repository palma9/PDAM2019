import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { SchoolService } from 'src/app/controller/services/school.service';
import { School } from 'src/app/controller/model/school';

@Component({
  selector: 'app-school-dialog',
  templateUrl: './school-dialog.component.html'
})
export class SchoolDialogComponent implements OnInit {

  edit: boolean;
  schoolId: string;
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef < SchoolDialogComponent > ,
    private snackBar: MatSnackBar, private fb: FormBuilder, private schoolService: SchoolService) {}


  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.schoolId = this.data.school.id;
    } else {
      this.edit = false;
    }
  }

  onSubmit() {
    if (this.edit) {
      const editedSchool: School = <School>this.form.value;
      this.schoolService.edit(this.schoolId, editedSchool).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => this.snackBar.open('There was an error when were trying to edit this school.', 'Close', { duration: 3000 }));
    } else {
      const newSchool: School = <School>this.form.value;
      this.schoolService.create(newSchool).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => this.snackBar.open('There was an error when were trying to create this school.', 'Close', { duration: 3000 }));
    }
  }

  createForm() {
    if (this.data) {
      const editForm: FormGroup = this.fb.group({
        name: [this.data.school.name, Validators.compose([Validators.required])],
        contact: [this.data.school.contact, Validators.compose([Validators.required])],
        address: [this.data.school.address, Validators.compose([Validators.required])],
        city: [this.data.school.city, Validators.compose([Validators.required])],
        country: [this.data.school.country, Validators.compose([Validators.required])]
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group({
        name: [null, Validators.compose([Validators.required])],
        contact: [null, Validators.compose([Validators.required])],
        address: [null, Validators.compose([Validators.required])],
        city: [null, Validators.compose([Validators.required])],
        country: [null, Validators.compose([Validators.required])]
      });
      this.form = newForm;
    }
  }
}
