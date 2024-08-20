import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { client } from '../store/model/clients.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class clientsService {
  private baseurl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<client[]> {
    return this.http.get<client[]>(this.baseurl);
  }

  Getbycode(code: number): Observable<client> {
    return this.http.get<client>(`${this.baseurl}/${code}`);
  }

  Delete(code: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${code}`);
  }

  Update(data: client): Observable<client> {
    return this.http.put<client>(`${this.baseurl}/${data.id}`, data);
  }

  Create(data: client): Observable<client> {
    return this.http.post<client>(this.baseurl, data);
  }
}




