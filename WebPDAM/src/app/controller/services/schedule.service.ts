import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResponseContainer } from '../interfaces/response-container';
import { ScheduleResponse } from '../interfaces/schedule-response';
import { Schedule } from '../model/schedule';
import { AuthService } from './auth.service';

const baseUrl = `${environment.apiUrl}/schedules`;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  create(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${baseUrl}`, schedule, this.requestOptions);
  }

  createMany(schedules: Schedule[]): Observable<Schedule> {
    return this.http.post<Schedule>(`${baseUrl}/many`, schedules, this.requestOptions);
  }

  getAll(): Observable<ResponseContainer<ScheduleResponse>> {
    return this.http.get<ResponseContainer<ScheduleResponse>>(`${baseUrl}`, this.requestOptions);
  }

  getAllFiltered(query: string): Observable<ResponseContainer<ScheduleResponse>> {
    return this.http.get<ResponseContainer<ScheduleResponse>>(`${baseUrl}?${query}`, this.requestOptions);
  }

  getOneDayFiltered(query: string): Observable<ScheduleResponse[]> {
    return this.http.get<ScheduleResponse[]>(`${baseUrl}/oneday?${query}`, this.requestOptions);
  }

  edit(id: string, data: Schedule) {
    return this.http.put<Schedule>(`${baseUrl}/${id}`, data, this.requestOptions);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`, this.requestOptions);
  }
}
