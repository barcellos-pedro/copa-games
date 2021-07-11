import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  secondPlaceId: string;
  componentDestroyed$: Subject<boolean> = new Subject();
  loadingError$ = new Subject<boolean>();

  constructor(public service: GamesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getGame();
    setTimeout(()=> this.router.navigate(['resultado-final', { winner: this.winnerId, secondPlace: this.secondPlaceId }]), 3000);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  getGame(): void {
    this.winnerId = this.route.snapshot.paramMap.get('winner');
    this.secondPlaceId = this.route.snapshot.paramMap.get('secondPlace');
    this.game$ = this.service.getGameById(this.winnerId).pipe(
      takeUntil(this.componentDestroyed$),
      catchError<any, any>((error) =>{
        this.loadingError$.next(true);
        return of();
      })
    )
  }

}
