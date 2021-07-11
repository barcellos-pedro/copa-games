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

  /**
   * 
   * @param list
   * @returns List of paired games
   */
  pairGames(list: Game[]) {
    let gamesList = [...list];
    let pairedGames: any[] = [];
    let matchBuilder = (match1) => (match2) => [match1, match2];

    while (gamesList.length) {
      let appendMatch = matchBuilder(gamesList.splice(0, 1)[0]);
      let match = appendMatch(gamesList.splice(-1)[0]);
      pairedGames.push(match);
    }
    return pairedGames;
  }

  /**
   * 
   * @param game1 
   * @param game2 
   * @returns Winner of battle/match
   */
  battle(game1: Game, game2: Game): Game {
    let game1Points = 0;
    let game2Points = 0;

    game1.nota > game2.nota && game1.nota !== game2.nota ? game1Points++ : game2Points++;
    game1.ano > game2.ano && game1.ano !== game2.ano ? game1Points++ : game2Points++;
    game1.titulo.localeCompare(game2.titulo) == -1 ? game1Points++ : game2Points++;

    return game1Points > game2Points ? game1 : game2;
  }

  play(gamesList: Game[]) {
    if(!gamesList.length || gamesList.length < 8) {
      return;
    }
    let quartas: any[] = this.pairGames(gamesList);
    let semi: any[] = [];
    let final: any[] = [];

    quartas.forEach((group) => {
      let [game1, game2] = group;
      semi.push(this.battle(game1, game2));
    });

    let [semi1, semi2, semi3, semi4] = semi;
    final = [this.battle(semi1, semi2), this.battle(semi3, semi4)];

    let winner = this.battle(final[0], final[1]);
    let secondPlace = final.find((game: Game) => game.id !== winner.id);

    console.log('vencedor! \n', winner);
    console.log('segundo colocado \n', secondPlace);

    // mandar pra pagina de resultado => winner
    // mandar pra pagina de resultado final => [winner, secondPlace]
  }

}
