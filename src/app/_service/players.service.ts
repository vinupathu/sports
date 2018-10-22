import { Observable, of, observable } from 'rxjs';
import { IPlayer } from '../i-player';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private players;
  public baseUrl = 'https://api.mlab.com/api/1/databases/sports/collections/cricket';

  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<IPlayer[]> {
    const playersURL = this.baseUrl + '?apiKey=U-gkXIlw7Uj_xFaqrTucwsbs1VoEIB8f';
    return this.http.get<IPlayer[]>(playersURL);
    /*return of([
      {id: 1, name: 'Avinash'},
      {id: 2, name: 'Vinay'},
    ]);*/
  }

  public getLazyPlayers(page): Observable<any> {
    const sk = page * 10;
    const l = 10;
    const playersURL = this.baseUrl + '?sk=' + sk + '&l=' + l + '&apiKey=U-gkXIlw7Uj_xFaqrTucwsbs1VoEIB8f';
    return this.http.get<IPlayer[]>(playersURL);

    /*return new Observable(observer => {
      this.getPlayers().
        subscribe(
          (data) => {
            this.players = data.splice((page * 10), 10);
            observer.next(this.players);
          }
        );
      });*/
  }

  public getPlayerByID(id): Observable<any> {console.log(id);
    const playersURL = this.baseUrl + '/' + id + '?apiKey=U-gkXIlw7Uj_xFaqrTucwsbs1VoEIB8f';
    return this.http.get<IPlayer[]>(playersURL);
    /*return new Observable(observer => {
      this.getPlayers().
        subscribe(
          (data) => {
            this.players = data.filter((val) => {
              return val.id === id;
            });
            observer.next(this.players);
          }
        );
      });*/
  }

  public updatePlayer(data, id): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const playersURL = this.baseUrl + '/' + id + '?apiKey=U-gkXIlw7Uj_xFaqrTucwsbs1VoEIB8f';
    const jsondata = JSON.stringify(data);
    return this.http.put(playersURL, jsondata, httpOptions);
  }

  public addPlayer(data): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const playersURL = this.baseUrl + '?apiKey=U-gkXIlw7Uj_xFaqrTucwsbs1VoEIB8f';
    const jsondata = JSON.stringify(data);
    return this.http.post(playersURL, jsondata, httpOptions);
  }

  public deletePlayer(id): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const playersURL = this.baseUrl + '/' + id + '?apiKey=U-gkXIlw7Uj_xFaqrTucwsbs1VoEIB8f';
    return this.http.delete(playersURL, httpOptions);
  }

}
