import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent, DashboardLayoutComponent } from './core';
import { HeaderComponent } from './core/header/header.component';
import { SidenavListComponent } from './core/sidenav-list/sidenav-list.component';
import { AbsenceDialogComponent } from './dialogs/absence-dialog/absence-dialog.component';
import { ClassroomDialogComponent } from './dialogs/classroom-dialog/classroom-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { GradeDialogComponent } from './dialogs/grade-dialog/grade-dialog.component';
import { ScheduleDialogComponent } from './dialogs/schedule-dialog/schedule-dialog.component';
import { SchoolDialogComponent } from './dialogs/school-dialog/school-dialog.component';
import { SubjectDialogComponent } from './dialogs/subject-dialog/subject-dialog.component';
import { SubsAddTeacherDialogComponent } from './dialogs/subs-add-teacher-dialog/subs-add-teacher-dialog.component';
import { TeacherDialogComponent } from './dialogs/teacher-dialog/teacher-dialog.component';
import { MaterialModule } from './material.module';
import { TeacherPictureDialogComponent } from './dialogs/teacher-picture-dialog/teacher-picture-dialog.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    SchoolDialogComponent,
    DeleteDialogComponent,
    TeacherDialogComponent,
    ClassroomDialogComponent,
    GradeDialogComponent,
    SubjectDialogComponent,
    ScheduleDialogComponent,
    AbsenceDialogComponent,
    SubsAddTeacherDialogComponent,
    TeacherPictureDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  entryComponents: [
    SchoolDialogComponent,
    DeleteDialogComponent,
    TeacherDialogComponent,
    ClassroomDialogComponent,
    GradeDialogComponent,
    SubjectDialogComponent,
    ScheduleDialogComponent,
    AbsenceDialogComponent,
    SubsAddTeacherDialogComponent,
    TeacherPictureDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
