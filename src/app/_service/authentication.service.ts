import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public baseUrl = 'https://api.mlab.com/api/1/databases/sports/collections/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const apiUrl = this.baseUrl +
    '?q={"username": "' + username + '", "password": "' + password + '"}&apiKey=U-gkXIlw7Uj_xFaqrTucwsbs1VoEIB8f';
    return this.http.get(apiUrl)
    .pipe(map((response: Response) => {
      console.log(Object.keys(response).length);
        if (Object.keys(response).length > 0) {
          sessionStorage.setItem('currentUser', JSON.stringify(response));
          return true;
        }
        return false;
      }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }

}
