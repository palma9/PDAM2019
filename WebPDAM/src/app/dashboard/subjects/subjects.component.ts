import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subject } from 'src/app/controller/model/subject';
import { SubjectService } from 'src/app/controller/services/subject.service';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { SubjectDialogComponent } from 'src/app/dialogs/subject-dialog/subject-dialog.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html'
})
export class SubjectsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'grade', 'actions'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private snackBar: MatSnackBar, private subjectService: SubjectService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllSubjects();
  }

  getAllSubjects() {
    this.subjectService.getAll().subscribe(r => {
      this.dataSource = new MatTableDataSource(r.rows);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.snackBar.open('There was an error loading the data.', 'Close', { duration: 3000 });
    });
  }

  openDialogNewSubject() {
    const newSubjectDialog = this.dialog.open(SubjectDialogComponent, { minWidth: '300px' });

    newSubjectDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Subject created', 'Close', { duration: 3000 });
        this.getAllSubjects();
      }
    });
  }

  openDialogEditSubject(subject: Subject) {
    const updateSubjectDialog = this.dialog.open(SubjectDialogComponent, { minWidth: '300px', data: { subject: subject } });

    updateSubjectDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Subject edited', 'Close', { duration: 3000 });
        this.getAllSubjects();
      }
    });
  }

  openDialogDeleteSubject(subject: Subject) {
    const deleteSubjectDialog = this.dialog.open(DeleteDialogComponent, { minWidth: '300px' });

    deleteSubjectDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.subjectService.delete(subject.id).subscribe(r => this.getAllSubjects());
        this.getAllSubjects();
      }
    });
  }
}
