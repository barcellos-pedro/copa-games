import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() game: Game;
  @Output() notifyValue: EventEmitter<any> = new EventEmitter();
  checked: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  retornaTitulo({ titulo }): string {
    return titulo.slice(0, titulo.indexOf('(')).trim();
  }

  retornaConsole({ titulo }): string {
    return titulo.slice(titulo.indexOf('(') + 1, titulo.lastIndexOf(')'));
  }

  onChange(game: Game, checked) {
    this.notifyValue.emit({ ...game, checked });
  }

}
