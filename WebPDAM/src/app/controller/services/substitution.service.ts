import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Substitution } from '../model/substitution';
import { SubstitutionResponse } from '../interfaces/substitution-response';
import { ResponseContainer } from '../interfaces/response-container';
import { Observable } from 'rxjs';


const baseUrl = `${environment.apiUrl}/substitutions`;

@Injectable({
  providedIn: 'root'
})
export class SubstitutionService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  create(data: Substitution): Observable<SubstitutionResponse> {
    return this.http.post<SubstitutionResponse>(`${baseUrl}`, data, this.requestOptions);
  }

  createAbsence(data): Observable<ResponseContainer<SubstitutionResponse>>{
    return this.http.post<ResponseContainer<SubstitutionResponse>>(`${baseUrl}/absence`, data, this.requestOptions);
  }

  getAllMines(query): Observable<ResponseContainer<SubstitutionResponse>> {
    return this.http.get<ResponseContainer<SubstitutionResponse>>(`${baseUrl}?${query}`, this.requestOptions);
  }

  getAll(): Observable<ResponseContainer<SubstitutionResponse>> {
    return this.http.get<ResponseContainer<SubstitutionResponse>>(`${baseUrl}/all`, this.requestOptions);
  }

  getEmpties(): Observable<ResponseContainer<SubstitutionResponse>> {
    return this.http.get<ResponseContainer<SubstitutionResponse>>(`${baseUrl}/empty`, this.requestOptions);
  }

  edit(id: string, data: Substitution) {
    return this.http.put<SubstitutionResponse>(`${baseUrl}/${id}`, data, this.requestOptions);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`, this.requestOptions);
  }

  makepdf(query: string) {
    const headers = ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    return this.http.get(`${baseUrl}/makepdf?${query}`, {responseType: 'blob', headers: headers});
  }

}
