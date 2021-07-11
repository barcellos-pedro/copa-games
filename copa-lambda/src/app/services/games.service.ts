import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  readonly endpoint: string = "https://l3-processoseletivo.azurewebsites.net/api/Competidores?copa=games";

  constructor(private http: HttpClient) { }

  /**
   * Return all games
   * @returns Observable<Games[]>
   */
  getGames(): Observable<Game[]> {
    return this.http.get(this.endpoint).pipe<Game[]>(
      catchError<any, any>(error => of(undefined))
    );
  }

}
