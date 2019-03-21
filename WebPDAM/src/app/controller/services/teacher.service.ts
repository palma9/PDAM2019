import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResponseContainer } from '../interfaces/response-container';
import { UserResponse } from '../interfaces/user-response';
import { Teacher } from '../model/teacher';
import { AuthService } from './auth.service';


const baseUrl = `${environment.apiUrl}/teachers`;

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  createManager(teacher: Teacher): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${baseUrl}/schoolManager`, teacher, this.requestOptions);
  }

  createTeacher(teacher: Teacher): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${baseUrl}`, teacher, this.requestOptions);
  }

  createMany(data: Teacher[]): Observable<ResponseContainer<Teacher>> {
    return this.http.post<ResponseContainer<Teacher>>(`${baseUrl}/many`, data, this.requestOptions);
  }

  getAll(): Observable<ResponseContainer<UserResponse>> {
    return this.http.get<ResponseContainer<UserResponse>>(`${baseUrl}`, this.requestOptions);
  }

  getGuardTeachers(query: string): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${baseUrl}/guard?${query}`, this.requestOptions);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`, this.requestOptions);
  }
}
