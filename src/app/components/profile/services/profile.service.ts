import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../core/constants';
import { GetOrdersResponse, GetBalanceResponse, GetOrganizationsResponse } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getActiveOrders(token: string): Observable<GetOrdersResponse> {
    const url = `${API_URL}api/customer/get_order`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post<GetOrdersResponse>(
      url,
      { status: 'active' },
      { headers }
    );
  }

  getCustomerBalance(token: string) {
    const url = `${API_URL}api/balance_customer`;
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.get<GetBalanceResponse>(url, { headers });
}

getAllOrganizations(token: string) {
    const url = `${API_URL}api/get_all_business`;
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    return this.http.get<GetOrganizationsResponse>(url, { headers });
}

addOrganization(token: string, urlLink: string) {
    const url = `${API_URL}api/create_business_now`;
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });
    return this.http.post(url, { url: urlLink }, { headers });
}

topUpBalance(token: string, amount: number) {
    const url = `${API_URL}api/top_up_balance`;
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });
    return this.http.post(url, { amount }, { headers });
}

}


