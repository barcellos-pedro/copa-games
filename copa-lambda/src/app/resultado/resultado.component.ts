import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Game } from 'src/models/game';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit, OnDestroy {
  game$: Observable<Game>;
  winnerId: string;
  componentDestroyed$: Subject<boolean> = new Subject();
  loadingError$ = new Subject<boolean>();

  constructor(public service: GamesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGame();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  getGame(): void {
    this.winnerId = this.route.snapshot.paramMap.get('winner');
    this.game$ = this.service.getGameById(this.winnerId).pipe(
      takeUntil(this.componentDestroyed$),
      catchError<any, any>((error) =>{
        this.loadingError$.next(true);
        return of();
      })
    )
  }

}
