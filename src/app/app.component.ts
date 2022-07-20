import { Component } from '@angular/core';
import { KanbanCard, Tag } from './models/kanban-card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCardComponent } from './add-card/add-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kanban-board';

  public democard1: KanbanCard = {
    tag: {text: 'iOS', color: '#000000'},
    title: 'Add splash screen',
    description: 'Use company logo',
    link: 'http://google.com',
    id: 'A1'
  }

  public democard2: KanbanCard = {
    tag: {text: 'Andriod', color: '#17A14E'},
    title: 'Onboarding animation v2',
    description: 'Pilot version with Lottie',
    link: 'http://google.com',
    id: 'A2'
  }

  public allCards = [this.democard1, this.democard2];

  public backlogCards = ['A1', 'A2'];
  public toDoCards = [];
  public developmentCards = [];
  public completedCards = [];

  public searchText = '';
  public tags = [
    {text: 'iOS', color: '#000000'},
    {text: 'Andriod', color: '#17A14E'}
  ];
  public selectedTag = '';
  public searchFilter = '';
  public tagsFilter = [];

  public tagColours = ['#800000', '#008080', '#000080', '#FF00FF', '#800080', '#CD5C5C', '#FFA07A',  '#17A14E', '#6495ED ', '#F4A460']

  private nextId = 4;

  constructor(public dialog: MatDialog) { }

  get displayedCards() {
    let cards = this.allCards;
    if (this.searchFilter && this.searchFilter !== '') {
      cards = this.filterByText(this.searchFilter, cards);
    }
    if (this.tagsFilter && this.tagsFilter.length > 0) {
      cards = this.filterByTags(this.tagsFilter, cards);
    }
    return cards;
  }

  onSearch(searchText: string) {
    this.searchFilter = searchText;
  }

  filterByText(searchText: string, cards: KanbanCard[]) {
    if (!searchText || searchText === '') {
      return cards;
    } else {
      return cards.filter(card => card.title.toLowerCase().includes(searchText.toLowerCase()));
    }
  }

  filterByTags(tags: Tag[], cards: KanbanCard[]) {
    if (tags && tags.length > 0) {
      const tagsText = tags.map(tag => tag.text)
      return cards.filter(card => tagsText.includes(card.tag.text))
    } else {
      return cards;
    }
  }

  onFilterTag(tags: string[]) {
    this.tagsFilter = tags;
  }

  onSubmit(event) {
    this.onSearch(event.target.value);
  }

  onTagSelectChange(event) {
    this.onFilterTag(event.value)
  }

  onAddCard() {
    let dialogRef = this.dialog.open(AddCardComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createCard(result)
      }
    });
  }

  createCard(details) {
    let tag;
    if (details.tag) {
      const existingTag = this.tags.find(tag => tag.text === details.tag);
      if (existingTag) {
        tag = {...existingTag};
      } else {
        const randomColour = this.tagColours[Math.floor(Math.random()*this.tagColours.length)]
        tag = {text: details.tag, color: randomColour}
        this.tags.push(tag);
      }
    }
    this.allCards.push({
      ...details,
      id: `A${this.nextId}`,
      tag
    })
    this.backlogCards.push(`A${this.nextId}`);
    this.nextId += 1;
  }

  onMoveCard(card, column) {
    const id = card.id;
    let index

    switch(column) {
      case 'backlog':
        index = this.backlogCards.indexOf(id);
        if (index > -1) {
          this.backlogCards.splice(index, 1)
        }
        this.toDoCards.push(id)
        break;
      case 'toDo':
        index = this.toDoCards.indexOf(id);
        if (index > -1) {
          this.toDoCards.splice(index, 1)
        }
        this.developmentCards.push(id)
        break
      case 'development':
        index = this.developmentCards.indexOf(id);
        if (index > -1) {
          this.developmentCards.splice(index, 1)
        }
        this.completedCards.push(id)
        break
    }
  }
  
}
