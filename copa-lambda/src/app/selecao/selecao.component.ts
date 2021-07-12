import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from "rxjs";
import { catchError, takeUntil } from "rxjs/operators";
import { Game } from 'src/models/game';
import { GamesService } from '../services/games.service';
@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss']
})
export class SelecaoComponent implements OnInit, OnDestroy {
  games$: Observable<Array<Game>>;
  loadingError$ = new Subject<boolean>();
  componentDestroyed$: Subject<boolean> = new Subject();
  selectedGames: Game[] = [];

  constructor(private service: GamesService, private router: Router) { }

  ngOnInit(): void {
    this.games$ = this.service.getGames().pipe(
      takeUntil(this.componentDestroyed$),
      catchError<any, any>((error) => {
        this.loadingError$.next(true);
        return of();
      })
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  valueChange(event: Game) {
    if(event.checked) {
      this.selectedGames.push(event)
    } else {
      this.selectedGames = this.selectedGames.filter(game => game.titulo !== event.titulo)
    }
  }

  play() {
    if(this.selectedGames.length !== 8) {
      return;
    } else {
      let [winner, secondPlace] = this.service.play(this.selectedGames);
      this.router.navigate(['resultado', { winner, secondPlace }]);
    }
  }
}
