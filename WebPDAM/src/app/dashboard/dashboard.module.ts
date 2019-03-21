import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { DashboardRoutes } from './dashboard.routing';
import { GradesComponent } from './grades/grades.component';
import { NoSchoolComponent } from './no-school/no-school.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchoolsComponent } from './schools/schools.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AddGradesComponent } from './add-grades/add-grades.component';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { AddSubjectsComponent } from './add-subjects/add-subjects.component';
import { AddTeachersComponent } from './add-teachers/add-teachers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SchoolsComponent,
    ScheduleComponent,
    NoSchoolComponent,
    TeachersComponent,
    ClassroomComponent,
    GradesComponent,
    NotificationComponent,
    ProfileComponent,
    SubjectsComponent,
    AddScheduleComponent,
    AddGradesComponent,
    AddRoomsComponent,
    AddSubjectsComponent,
    AddTeachersComponent
  ]
})

export class DashboardModule { }
