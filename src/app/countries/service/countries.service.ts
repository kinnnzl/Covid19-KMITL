import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private endpointAllCountries = 'https://corona.lmao.ninja/v2/countries?sort=country';
  private endpointByCountry = 'https://corona.lmao.ninja/v2/countries/';
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

  getCovidAllCountries(): Observable<any> {
    return this.http.get(this.endpointAllCountries).pipe(map(this.extractData));
  }

  getBySearchCountry(country: string): Observable<any> {
    console.log(country);
    console.log(this.endpointByCountry + country);
    return this.http.get(this.endpointByCountry + country).pipe(map(this.extractData));
  }
}
