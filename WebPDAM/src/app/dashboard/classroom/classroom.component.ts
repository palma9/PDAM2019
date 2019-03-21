import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Room } from 'src/app/controller/model/room';
import { RoomService } from 'src/app/controller/services/room.service';
import { ClassroomDialogComponent } from 'src/app/dialogs/classroom-dialog/classroom-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html'
})
export class ClassroomComponent implements OnInit {
  displayedColumns: string[] = ['classNumber', 'actions'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private snackBar: MatSnackBar, private roomService: RoomService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllClassrooms();
  }

  getAllClassrooms() {
    this.roomService.getAll().subscribe(r => {
      this.dataSource = new MatTableDataSource(r.rows);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.snackBar.open('There was an error loading the data.', 'Close', { duration: 3000 });
    });
  }

  openDialogNewClassroom() {
    const newClassroomDialog = this.dialog.open(ClassroomDialogComponent, { minWidth: '300px' });

    newClassroomDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Classroom created', 'Close', { duration: 3000 });
        this.getAllClassrooms();
      }
    });
  }

  openDialogEditClassroom(room: Room) {
    const updateClassroomDialog = this.dialog.open(ClassroomDialogComponent, { minWidth: '300px', data: { classroom: room } });

    updateClassroomDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Classroom edited', 'Close', { duration: 3000 });
        this.getAllClassrooms();
      }
    });
  }

  openDialogDeleteClassroom(room: Room) {
    const deleteClassroomDialog = this.dialog.open(DeleteDialogComponent, { minWidth: '300px' });

    deleteClassroomDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.roomService.delete(room.id).subscribe(r => this.getAllClassrooms());
        this.getAllClassrooms();
      }
    });
  }

}
