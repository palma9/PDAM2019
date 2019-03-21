import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/controller/dto/login-dto';
import { AuthService } from 'src/app/controller/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide = true;

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public snackBar: MatSnackBar,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.checkUserData()) {
      const user = this.authService.getUser();
      if (user.role === 'admin') {
        this.router.navigate(['/schools']);
      } else if (user.school) {
        this.router.navigate(['/substitutions']);
      } else {
        this.router.navigate(['/noschool']);
      }
    }
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    const loginDto: LoginDto = this.form.value;
    this.authService.login(loginDto).subscribe(loginResp => {
      this.authService.setLoginData(loginResp);
      if (loginResp.user.role === 'admin') {
        this.router.navigate(['/schools']);
      } else if (loginResp.user.school != null) {
        this.router.navigate(['/substitutions']);
      } else {
        this.router.navigate(['/noschool']);
      }

    }, error => {
      this.snackBar.open('There was an error when we were trying to login.', 'Close', {
        duration: 3000
      });
    });
  }
}
