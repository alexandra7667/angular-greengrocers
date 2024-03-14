import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input('cartItem') cartItem: CartItem | null = null;
  @Output('decrement') decrement  = new EventEmitter<CartItem>(); //För att dekrementera quantity
  @Output('increment') increment = new EventEmitter<CartItem>(); //För att inkrementera quantity

  decrementBtnClicked() {
    if (this.cartItem) {
      this.decrement.emit(this.cartItem);
    }
  }

  incrementBtnClicked() {
    if (this.cartItem) {
      this.increment.emit(this.cartItem);
    }
  }
}
