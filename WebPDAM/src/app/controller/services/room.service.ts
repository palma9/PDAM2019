import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResponseContainer } from '../interfaces/response-container';
import { Room } from '../model/room';
import { AuthService } from './auth.service';


const baseUrl = `${environment.apiUrl}/rooms`;

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  create(room: Room): Observable<Room> {
    return this.http.post<Room>(`${baseUrl}`, room, this.requestOptions);
  }

  createMany(data: Room[]): Observable<ResponseContainer<Room>> {
    return this.http.post<ResponseContainer<Room>>(`${baseUrl}/many`, data, this.requestOptions);
  }

  getAll(): Observable<ResponseContainer<Room>> {
    return this.http.get<ResponseContainer<Room>>(`${baseUrl}`, this.requestOptions);
  }

  edit(id: string, data: Room) {
    return this.http.put<Room>(`${baseUrl}/${id}`, data, this.requestOptions);
  }

  delete(id: string) {
    return this.http.delete<Room>(`${baseUrl}/${id}`, this.requestOptions);
  }
}
