import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/models/game';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() game: Game;
  @Input() disabled: boolean;
  @Output() notifyValue: EventEmitter<any> = new EventEmitter();
  checked: boolean;

  constructor(public service: GamesService) { }

  ngOnInit(): void {
  }

  onChange(game: Game, checked) {
    this.notifyValue.emit({ ...game, checked });
  }

}
