import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KanbanCard } from '../models/kanban-card';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss']
})
export class KanbanCardComponent implements OnInit {
  @Input() card: KanbanCard;
  @Input() lastColumn = false;
  @Output() moveCard = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onMoveCard() {
    this.moveCard.emit();
  }

}
