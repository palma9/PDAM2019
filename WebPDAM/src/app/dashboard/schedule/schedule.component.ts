import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/controller/services/schedule.service';
import { ScheduleResponse } from 'src/app/controller/interfaces/schedule-response';
import { GradeService } from 'src/app/controller/services/grade.service';
import { TeacherService } from 'src/app/controller/services/teacher.service';
import { RoomService } from 'src/app/controller/services/room.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SubjectDialogComponent } from 'src/app/dialogs/subject-dialog/subject-dialog.component';
import { ScheduleDialogComponent } from 'src/app/dialogs/schedule-dialog/schedule-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  scheduleList: ScheduleResponse[];
  daysOfWeek = [1, 2, 3, 4, 5];
  timeIntervals = [1, 2, 3, 4, 5, 6];

  filterList;
  lastQuery: string;

  constructor(private scheduleService: ScheduleService, private gradeService: GradeService,
              private teacherService: TeacherService, private roomService: RoomService,
              private snackBar: MatSnackBar, public dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.getAll(null);
  }

  getAll(e: string) {
    if (e != null) {
      this.scheduleService.getAllFiltered(this.lastQuery).subscribe(s => this.scheduleList = s.rows);
    } else {
      this.scheduleService.getAll().subscribe(s => this.scheduleList = s.rows);
    }
  }

  getSchedule(dayOfWeek: number, timeInterval: number): ScheduleResponse {
    return this.scheduleList.find((s) => {
      return s.dayOfWeek === dayOfWeek && s.timeInterval === timeInterval;
    });
  }

  onFirstFilter(e: number) {
    if (e == 0) {
      this.teacherService.getAll().subscribe(t => this.filterList = t.rows);
    } else if (e == 1) {
      this.gradeService.getAll().subscribe(g => this.filterList = g.rows);
    } else {
      this.roomService.getAll().subscribe(r => this.filterList = r.rows);
    }
  }

  filter(e: string) {
    this.lastQuery = `filter=${e}`;
    this.scheduleService.getAllFiltered(this.lastQuery).subscribe(s => this.scheduleList = s.rows);
  }

  openDialogEditSchedule(schedule: ScheduleResponse) {
    const updateScheduleDialog = this.dialog.open(ScheduleDialogComponent, { minWidth: '300px', data: { schedule } });

    updateScheduleDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Schedule edited', 'Close', { duration: 3000 });
        this.getAll(this.lastQuery);
      }
    });
  }
  openDialogNewSchedule(d: number, t: number) {
    const newScheduleDialog = this.dialog.open(ScheduleDialogComponent, { minWidth: '300px', data: { day: d, time: t } });

    newScheduleDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Schedule edited', 'Close', { duration: 3000 });
        this.getAll(this.lastQuery);
      }
    });
  }
  openAddSchedules() {
    this.router.navigate(['/addschedule']);
  }

}
