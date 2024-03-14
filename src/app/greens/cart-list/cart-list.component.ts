import { Component } from '@angular/core';
import { GreensService } from '../services/greens.service';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent {
  constructor(private readonly greensService: GreensService) {
    this.fetchItems();
  }

  cartItems: any;

  //hämta cart items från service
  fetchItems() {
    this.cartItems = this.greensService.getCartItems();
  }

  //Dekrementera quantity hos ett item i cart
  //Vänta på decrement metod i service så man hämtar uppdaterad cartItem
  async decrement(cartItem: CartItem) {
    console.log('in cart list increment ' + cartItem.name);
    await this.greensService.decrement(cartItem);
    this.cartItems = this.greensService.cartItems;
  }

  //Inkrementera quantity hos ett item i cart. Metodnamn ska vara samma som i service
  async increment(cartItem: CartItem) {
    console.log('in cart list increment ' + cartItem.name);
    await this.greensService.increment(cartItem);
    this.cartItems = this.greensService.cartItems;
  }
}
