import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { GradeService } from 'src/app/controller/services/grade.service';
import { Grade } from 'src/app/controller/model/grade';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { GradeDialogComponent } from 'src/app/dialogs/grade-dialog/grade-dialog.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html'
})
export class GradesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private snackBar: MatSnackBar, private gradeService: GradeService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllGrades();
  }

  getAllGrades() {
    this.gradeService.getAll().subscribe(r => {
      this.dataSource = new MatTableDataSource(r.rows);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.snackBar.open('There was an error loading the data.', 'Close', { duration: 3000 });
    });
  }

  openDialogNewGrade() {
    const newGradeDialog = this.dialog.open(GradeDialogComponent, { minWidth: '300px' });

    newGradeDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Grade created', 'Close', { duration: 3000 });
        this.getAllGrades();
      }
    });
  }

  openDialogEditGrade(grade: Grade) {
    const updateGradeDialog = this.dialog.open(GradeDialogComponent, { minWidth: '300px', data: { grade: grade } });

    updateGradeDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Grade edited', 'Close', { duration: 3000 });
        this.getAllGrades();
      }
    });
  }

  openDialogDeleteGrade(grade: Grade) {
    const deleteGradeDialog = this.dialog.open(DeleteDialogComponent, { minWidth: '300px' });

    deleteGradeDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.gradeService.delete(grade.id).subscribe(r => this.getAllGrades());
        this.getAllGrades();
      }
    });
  }

}
