import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResponseContainer } from '../interfaces/response-container';
import { SubjectResponse } from '../interfaces/subject-response';
import { Subject } from '../model/subject';
import { AuthService } from './auth.service';

const baseUrl = `${environment.apiUrl}/subjects`;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  create(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${baseUrl}`, subject, this.requestOptions);
  }

  createMany(data: Subject[]): Observable<ResponseContainer<Subject>> {
    return this.http.post<ResponseContainer<Subject>>(`${baseUrl}/many`, data, this.requestOptions);
  }

  getAll(): Observable<ResponseContainer<SubjectResponse>> {
    return this.http.get<ResponseContainer<SubjectResponse>>(`${baseUrl}`, this.requestOptions);
  }

  getAllFiltered(query): Observable<ResponseContainer<SubjectResponse>> {
    return this.http.get<ResponseContainer<SubjectResponse>>(`${baseUrl}?${query}`, this.requestOptions);
  }

  edit(id: string, data: Subject) {
    return this.http.put<Subject>(`${baseUrl}/${id}`, data, this.requestOptions);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`, this.requestOptions);
  }
}
