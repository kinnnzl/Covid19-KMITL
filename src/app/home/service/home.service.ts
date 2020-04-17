import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private endpoint = 'https://corona.lmao.ninja/v2/all';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getCovidAll(): Observable<any> {
    return this.http.get(this.endpoint).pipe(map(this.extractData));
  }

  getVisitors() {
    let visitorList: AngularFireList<any>;
    visitorList = this.db.list('visitor');
    return visitorList.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => ({
          key: action.key,
          value: action.payload.val(),
        }));
      })
    );
  }

  updateVisitors(id: any, count: any, status: any) {
    switch (status) {
      case 'initial':
        count += 1;
        this.db.list('/visitor').set(id, count++);
        break;
    }
  }
}
