import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, from, Observable, of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { Game } from 'src/models/game';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-resultado-final',
  templateUrl: './resultado-final.component.html',
  styleUrls: ['./resultado-final.component.scss']
})
export class ResultadoFinalComponent implements OnInit, OnDestroy {
  games$: Observable<Game[]>;
  winnerId: string;
  secondPlaceId: string;
  componentDestroyed$: Subject<boolean> = new Subject();
  loadingError$ = new Subject<boolean>();

  constructor(public service: GamesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFinalists();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  getFinalists(): void {
    this.winnerId = this.route.snapshot.paramMap.get('winner');
    this.secondPlaceId = this.route.snapshot.paramMap.get('secondPlace');
    
    console.log([this.winnerId, this.secondPlaceId]);

    this.games$ = forkJoin({
      winner: this.service.getGameById(this.winnerId),
      secondPlace: this.service.getGameById(this.secondPlaceId)
    }).pipe(
      takeUntil(this.componentDestroyed$),
      map(resp => [resp.winner, resp.secondPlace])
    );
  }

}
