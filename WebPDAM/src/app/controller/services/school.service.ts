import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { ResponseContainer } from '../interfaces/response-container';
import { SchoolResponse } from '../interfaces/school-response';
import { School } from '../model/school';
import { AuthService } from './auth.service';


const baseUrl = `${environment.apiUrl}/schools`;

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  create(school: School): Observable<SchoolResponse> {
    return this.http.post<SchoolResponse>(`${baseUrl}`, school, this.requestOptions);
  }

  getAll(): Observable<ResponseContainer<SchoolResponse>> {
    return this.http.get<ResponseContainer<SchoolResponse>>(`${baseUrl}`, this.requestOptions);
  }

  edit(id: string, data: School) {
    return this.http.put<SchoolResponse>(`${baseUrl}/${id}`, data, this.requestOptions);
  }

  delete(id: string) {
    return this.http.delete<SchoolResponse>(`${baseUrl}/${id}`, this.requestOptions);
  }
}
