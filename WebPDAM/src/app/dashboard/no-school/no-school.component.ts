import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SchoolService } from 'src/app/controller/services/school.service';
import { School } from 'src/app/controller/model/school';
import { AuthService } from 'src/app/controller/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-school',
  templateUrl: './no-school.component.html'
})
export class NoSchoolComponent implements OnInit {

  form: FormGroup;
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, public router: Router, 
              private schoolService: SchoolService, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      contact: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])]
    })
  }

  onSubmit() {
      const newSchool: School = this.form.value as School;
      this.schoolService.create(newSchool).subscribe(r => {
        this.authService.setSchool(r.id);
        this.router.navigate(['/schedule']);
      }
      , e => this.snackBar.open('Error creating school', 'close', { duration: 3000 }));
    }

}
