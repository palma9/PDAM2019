import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ResponseContainer } from 'src/app/controller/interfaces/response-container';
import { UserResponse } from 'src/app/controller/interfaces/user-response';
import { AuthService } from 'src/app/controller/services/auth.service';
import { TeacherService } from 'src/app/controller/services/teacher.service';
import { AbsenceDialogComponent } from 'src/app/dialogs/absence-dialog/absence-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { TeacherDialogComponent } from 'src/app/dialogs/teacher-dialog/teacher-dialog.component';
import { TeacherPictureDialogComponent } from 'src/app/dialogs/teacher-picture-dialog/teacher-picture-dialog.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  teachers: ResponseContainer<UserResponse>;
  constructor(private teacherService: TeacherService, private authService: AuthService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getAll().subscribe(t => this.teachers = t);
  }

  openDialogNewTeacher() {
    const newTeacherDialog = this.dialog.open(TeacherDialogComponent, { minWidth: '300px' });

    newTeacherDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Teacher created', 'Close', { duration: 3000 });
        this.getAllTeachers();
      }
    });
  }

  openDialogEditTeacher(teacher: UserResponse) {
    const updateTeacherDialog = this.dialog.open(TeacherDialogComponent, { minWidth: '300px', data: { teacher: teacher } });

    updateTeacherDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Teacher edited', 'Close', { duration: 3000 });
        this.getAllTeachers();
      }
    });
  }

  openDialogDeleteTeacher(teacher: UserResponse) {
    const deleteTeacherDialog = this.dialog.open(DeleteDialogComponent, { minWidth: '300px' });

    deleteTeacherDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.teacherService.delete(teacher.id).subscribe(r => this.getAllTeachers());
        this.getAllTeachers();
      }
    });
  }

  openDialogNewAbsence(teacher: UserResponse) {
    const newAbsenceDialog = this.dialog.open(AbsenceDialogComponent, { minWidth: '300px', data: { teacher: teacher } });

    newAbsenceDialog.afterClosed().subscribe(res => {
      if (res === 'confirm') {
        this.snackBar.open('New absence created', 'Close', { duration: 3000 });
      }
    })

  }

  isSchoolManager() {
    if (this.authService.getUser().role === 'schoolManager') {
      return true;
    }
    return false;
  }

  public openUploadDialog(t: UserResponse) {
    const dialogRef = this.dialog.open(TeacherPictureDialogComponent, { minWidth: '300px', data: { id: t.id } });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'confirm') {
        this.snackBar.open('El fichero se subió correctamente', 'Cerrar', { duration: 3000 });
        this.getAllTeachers();
      }
    });
  }
}
