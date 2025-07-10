import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordChangeService {
  private apiUrl = 'http://192.168.31.200:5000/api/password_change';

  constructor(private http: HttpClient) {}

  /**
   * Отправить письмо для восстановления пароля
   * @param email email пользователя
   */
  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email });
  }

  /**
   * Сбросить пароль по токену
   * @param token токен из письма
   * @param newPassword новый пароль
   */
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { token, newPassword });
  }
}
