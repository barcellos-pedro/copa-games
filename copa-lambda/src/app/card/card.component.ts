import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() game: Game;

  constructor() { }

  ngOnInit(): void {
  }

  retornaConsole({ titulo }): string {
    return titulo.slice(titulo.indexOf('(') + 1, titulo.lastIndexOf(')'));
  }

}
