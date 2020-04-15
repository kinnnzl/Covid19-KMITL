import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThailandService {
  private endpoint = 'https://covid19.th-stat.com/api/open/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getCovidThai(): Observable<any> {
    const url = this.endpoint + 'today';
    return this.http.get(url).pipe(map(this.extractData));
  }

  getCovidProvince(): Observable<any> {
    const url = this.endpoint + 'cases/sum';
    return this.http.get(url).pipe(map(this.extractData));
  }

}
