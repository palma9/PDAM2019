import { Component, OnInit } from '@angular/core';
import { SchoolResponse } from 'src/app/controller/interfaces/school-response';
import { SchoolService } from 'src/app/controller/services/school.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SchoolDialogComponent } from 'src/app/dialogs/school-dialog/school-dialog.component';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html'
})
export class SchoolsComponent implements OnInit {

  schoolList: SchoolResponse[];

  constructor(private schoolService: SchoolService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.getAllSchools();
  }

  getAllSchools() {
    this.schoolService.getAll().subscribe(s => this.schoolList = s.rows);
  }

  openDialogNewSchool() {
    const newSchoolDialog = this.dialog.open(SchoolDialogComponent, { minWidth: '250px' });

    newSchoolDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('School created', 'Close', { duration: 3000 });
        this.getAllSchools();
      }
    });
  }

  openDialogEditSchool(school: SchoolResponse) {
    const updateSchoolDialog = this.dialog.open(SchoolDialogComponent, { minWidth: '250px', data: { school: school } });

    updateSchoolDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('School edited', 'Close', { duration: 3000 });
        this.getAllSchools();
      }
    });
  }

}
