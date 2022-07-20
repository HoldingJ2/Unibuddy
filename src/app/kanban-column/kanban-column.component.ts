import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KanbanCard } from '../models/kanban-card';

@Component({
  selector: 'app-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss']
})
export class KanbanColumnComponent implements OnInit {
  @Input() columnTitle: string;
  @Input() colour: string;
  @Input() allowCreate = false;
  @Input() cardIds: string[] = [];
  @Input() allCards: KanbanCard[];
  @Input() lastColumn = false;
  @Output() addCard = new EventEmitter();
  @Output() moveCard = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  get cards() {
    return this.allCards.filter(card => this.cardIds.includes(card.id))
  }

  onAddCard() {
    this.addCard.emit();
  }

  onMoveCard(card) {
    this.moveCard.emit(card)
  }

}
