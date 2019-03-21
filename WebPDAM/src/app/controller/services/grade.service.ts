import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Grade } from '../model/grade';
import { Observable } from 'rxjs';
import { ResponseContainer } from '../interfaces/response-container';

const baseUrl = `${environment.apiUrl}/grades`;

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  create(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(`${baseUrl}`, grade, this.requestOptions);
  }

  createMany(data: Grade[]): Observable<ResponseContainer<Grade>> {
    return this.http.post<ResponseContainer<Grade>>(`${baseUrl}/many`, data, this.requestOptions);
  }

  getAll(): Observable<ResponseContainer<Grade>> {
    return this.http.get<ResponseContainer<Grade>>(`${baseUrl}`, this.requestOptions);
  }

  edit(id: string, data: Grade) {
    return this.http.put<Grade>(`${baseUrl}/${id}`, data, this.requestOptions);
  }

  delete(id: string) {
    return this.http.delete<Grade>(`${baseUrl}/${id}`, this.requestOptions);
  }
}
