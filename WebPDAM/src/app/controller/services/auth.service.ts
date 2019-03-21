import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

import { LoginDto } from '../dto/login-dto';
import { RegisterDto } from '../dto/register-dto';
import { LoginResponse } from '../interfaces/login-response';


const authUrl = `${environment.apiUrl}`;
const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  request(email: string, password: string) {
    let emailPass: string;
    emailPass = btoa(email + ':' + password);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${emailPass}`
      })
    };
  }

  constructor(private http: HttpClient, private router: Router) { }

  managerSignUp(registerDto: RegisterDto): Observable<LoginResponse> {
    const token = `access_token=${environment.access_token}`;
    return this.http.post<LoginResponse>(`${authUrl}/teachers/schoolManager?${token}`, registerDto, requestOptions);
  }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const request = this.request(loginDto.email, loginDto.password);
    return this.http.post<LoginResponse>(`${authUrl}/auth`, environment.masterKey, request);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('loginUser', JSON.stringify(loginResponse));
  }

  checkUserData(): boolean {
    if (localStorage.getItem('loginUser') != null) {
      return true;
    }
    return false;
  }

  getToken() {
    const loggedUserData = JSON.parse(localStorage.getItem('loginUser')) as LoginResponse;
    return loggedUserData.token;
  }

  getUser() {
    const loggedUserData = JSON.parse(localStorage.getItem('loginUser')) as LoginResponse;
    return loggedUserData.user;
  }

  setSchool(id: string) {
    const loggedUserData = JSON.parse(localStorage.getItem('loginUser')) as LoginResponse;
    loggedUserData.user.school = id;
    this.setLoginData(loggedUserData);
  }
}
