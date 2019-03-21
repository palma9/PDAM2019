import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Observable, Subject } from 'rxjs';
import { UserResponse } from '../interfaces/user-response';
import { ResponseContainer } from '../interfaces/response-container';
import { LoginDto } from '../dto/login-dto';

const baseUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  create(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${baseUrl}`, user, this.requestOptions);
  }

  getAll(): Observable<ResponseContainer<UserResponse>> {
    return this.http.get<ResponseContainer<UserResponse>>(`${baseUrl}`, this.requestOptions);
  }

  edit(id: string, data: User) {
    return this.http.put<UserResponse>(`${baseUrl}/${id}`, data, this.requestOptions);
  }

  changePassword(newPassword, oldData: LoginDto) {
    return this.http.put<UserResponse>(`${baseUrl}/me/password`, newPassword, this.authService.request(oldData.email, oldData.password));
  }

  public uploadPicture(files: Set<File>, userId: string) {
    // this will be the our resulting map
    const uploadUrl = `${baseUrl}/photo/${userId}?access_token=${this.authService.getToken()}`;
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('photo', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('PUT', uploadUrl, formData, { reportProgress: true });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

}
