import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  public tag = '';
  public title = '';
  public description = '';
  public link = '';

  constructor(public dialogRef: MatDialogRef<AddCardComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.tag && !this.title && !this.description && !this.link) {
      return
    }
    this.dialogRef.close({
      tag: this.tag,
      title: this.title,
      description: this.description,
      link: this.link
    });
  }

}
