import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SubstitutionResponse } from 'src/app/controller/interfaces/substitution-response';
import { AuthService } from 'src/app/controller/services/auth.service';
import { SubstitutionService } from 'src/app/controller/services/substitution.service';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { SubsAddTeacherDialogComponent } from 'src/app/dialogs/subs-add-teacher-dialog/subs-add-teacher-dialog.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  substitutions: SubstitutionResponse[];
  emptySubs: SubstitutionResponse[];
  allSubs: SubstitutionResponse[];

  constructor(private substitutionService: SubstitutionService, private authService: AuthService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.getMines();
    if (this.isAdmin()) {
      this.getAll();
      this.getEmpties();
    }
  }

  isAdmin(): boolean {
    return this.authService.getUser().role === 'schoolManager' ? true : false;
  }

  getMines() {
    this.substitutionService.getAllMines().subscribe(s => this.substitutions = s.rows);
  }

  getAll() {
    this.substitutionService.getAll().subscribe(r => this.allSubs = r.rows);
  }

  getEmpties() {
    this.substitutionService.getEmpties().subscribe(s => this.emptySubs = s.rows);
  }

  addTeacher(substitution: SubstitutionResponse) {
    const AddTeacherDialog = this.dialog.open(SubsAddTeacherDialogComponent, { minWidth: '300px', data: { sub: substitution } });

    AddTeacherDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Substitution done', 'Close', { duration: 3000 });
        this.loadData();
      }
    });
  }

  openDialogDelete(sub: SubstitutionResponse) {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, { minWidth: '300px' });

    deleteDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.substitutionService.delete(sub.id).subscribe(r => this.loadData());
      }
    });
  }

  getPDF() {
    const date = new Date();
    const dateFormat = `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getDate()}`;
    const query = `date=${dateFormat}`;
    this.substitutionService.makepdf(query).subscribe(data => saveAs(data, `substitutions-${dateFormat}.pdf`));
  }
}
