import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent implements OnInit {

  checkedRobot: boolean;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() { }

  captcha() {
    if (this.checkedRobot) {
      return true;
    } else {
      return false;
    }
  }

  delete() {
    this.dialogRef.close('confirm');
  }
}
