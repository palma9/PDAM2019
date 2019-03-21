import { Routes } from '@angular/router';

import { ClassroomComponent } from './classroom/classroom.component';
import { GradesComponent } from './grades/grades.component';
import { NoSchoolComponent } from './no-school/no-school.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchoolsComponent } from './schools/schools.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { AddGradesComponent } from './add-grades/add-grades.component';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { AddSubjectsComponent } from './add-subjects/add-subjects.component';
import { AddTeachersComponent } from './add-teachers/add-teachers.component';

export const DashboardRoutes: Routes = [{
  path: 'schedule',
  component: ScheduleComponent
}, {
  path: 'addschedule',
  component: AddScheduleComponent
}, {
  path: 'substitutions',
  component: NotificationComponent
}, {
  path: 'profile',
  component: ProfileComponent
}, {
  path: 'classrooms',
  component: ClassroomComponent
}, {
  path: 'grades',
  component: GradesComponent
}, {
  path: 'teachers',
  component: TeachersComponent
}, {
  path: 'subjects',
  component: SubjectsComponent
}, {
  path: 'schools',
  component: SchoolsComponent
}, {
  path: 'noschool',
  component: NoSchoolComponent
}, {
  path: 'addgrades',
  component: AddGradesComponent
}, {
  path: 'addrooms',
  component: AddRoomsComponent
}, {
  path: 'addsubjects',
  component: AddSubjectsComponent
}, {
  path: 'addteachers',
  component: AddTeachersComponent
}];
