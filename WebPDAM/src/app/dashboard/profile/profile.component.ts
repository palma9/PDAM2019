import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { UserResponse } from 'src/app/controller/interfaces/user-response';
import { AuthService } from 'src/app/controller/services/auth.service';
import { UserService } from 'src/app/controller/services/user.service';
import { LoginDto } from 'src/app/controller/dto/login-dto';
import { TeacherPictureDialogComponent } from 'src/app/dialogs/teacher-picture-dialog/teacher-picture-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: UserResponse;
  form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, public dialog: MatDialog,
              private authService: AuthService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadForms();
  }

  loadForms() {
    const passwordControl = new FormControl(null, Validators.required);
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required])],
      newpassword: passwordControl,
      checkpassword: new FormControl(null, [CustomValidators.equalTo(passwordControl)]),
    });
  }

  passwordAutogen() {
    const newPass = Math.random().toString(36).slice(-8);
    this.form.controls.newpassword.setValue(newPass);
    this.form.controls.checkpassword.setValue(newPass);
  }

  onPasswordSubmit() {
    const oldData: LoginDto = {email: this.user.email, password: this.form.controls.password.value}
    const newPassword: Object = {password: this.form.controls.newpassword.value};
    this.userService.changePassword(newPassword, oldData).subscribe();
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(TeacherPictureDialogComponent, { minWidth: '300px', data: { id: this.user.id } });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'confirm') {
        this.snackBar.open('El fichero se subió correctamente', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
