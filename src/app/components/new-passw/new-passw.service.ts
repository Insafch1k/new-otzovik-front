import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewPasswService {
  private apiUrl = 'http://192.168.31.200:5000/api/reset_password';

  constructor(private http: HttpClient) {}

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { token, new_password: password });
  }
}
