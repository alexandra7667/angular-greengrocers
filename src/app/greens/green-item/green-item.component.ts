import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../models/item';  //kommer från models - item.ts

@Component({
  selector: 'app-green-item',
  templateUrl: './green-item.component.html',
  styleUrls: ['./green-item.component.css'],
})
export class GreenItemComponent {
  @Input('item') item: Item | null = null;
  @Output('add') add = new EventEmitter<Item>(); //För att lägga i cart

  addBtnClicked() {
    if (this.item) {
      this.add.emit(this.item);
    }
  }
}
