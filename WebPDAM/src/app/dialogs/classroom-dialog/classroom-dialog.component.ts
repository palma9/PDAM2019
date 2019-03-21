import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Room } from 'src/app/controller/model/room';
import { RoomService } from 'src/app/controller/services/room.service';

@Component({
  selector: 'app-classroom-dialog',
  templateUrl: './classroom-dialog.component.html'
})
export class ClassroomDialogComponent implements OnInit {

  edit: boolean;
  roomId: string;
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ClassroomDialogComponent>,
              private snackBar: MatSnackBar, private fb: FormBuilder, private roomService: RoomService,
              private router: Router) { }


  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.roomId = this.data.classroom.id;
    } else {
      this.edit = false;
    }
  }

  onSubmit() {
    if (this.edit) {
      const editedRoom: Room = this.form.value as Room;
      this.roomService.edit(this.roomId, editedRoom).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => this.snackBar.open('There was an error when were trying to edit this room.', 'Close', { duration: 3000 }));
    } else {
      const newRoom: Room = this.form.value as Room;
      this.roomService.create(newRoom).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => this.snackBar.open('There was an error when were trying to create this room.', 'Close', { duration: 3000 }));
    }
  }

  createForm() {
    if (this.data) {
      const editForm: FormGroup = this.fb.group({
        classNumber: [this.data.classroom.classNumber, Validators.compose([Validators.required])]
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group({
        classNumber: [null, Validators.compose([Validators.required])]
      });
      this.form = newForm;
    }
  }

  addMany() {
    this.router.navigate(['/addrooms']);
    this.dialogRef.close();
  }
}
