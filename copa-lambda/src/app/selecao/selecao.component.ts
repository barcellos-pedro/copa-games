import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private service: GamesService) { }

  ngOnInit(): void {
    this.games$ = this.service.getGames().pipe(
      takeUntil(this.componentDestroyed$),
      catchError<any, any>((error) => {
        console.log('deu ruim')
        this.loadingError$.next(true);
        return of();
      })
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  onChange(event) {
    console.log(event)
  }

}
