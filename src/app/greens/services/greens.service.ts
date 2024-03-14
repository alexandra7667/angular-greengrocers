import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Item } from '../models/item';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class GreensService {
  constructor(private http: HttpClient) {
    this.getItems(); //kör getItems när man startar program
  }

  //GET all items
  items: any;

  async getItems(): Promise<Item[]> {
    const result = await firstValueFrom(
      this.http.get(`${environment.apiUrl}groceries`)
    );
    this.items = result;
    return this.items;
  }

  //Add to cart
  cartItems: CartItem[] = [];

  async addToCart(item: Item) {
    //see if it is already in cart, then increment quantity instead of adding to cart
    const index = this.cartItems.findIndex(
      (cartItem: CartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
      this.cartItems[index].quantity++;
      console.log(
        'updating item in cart. Name: ' +
          this.cartItems[index].name +
          ' Quantity: ' +
          this.cartItems[index].quantity
      );
    }
    //if item is not already in cart, create a new cartitem from item and add to cart
    else {
      const cartItem: CartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };

      this.cartItems.push(cartItem);
    }
  }

  //Get cart items
  getCartItems() {
    return this.cartItems;
  }

  // Inkrementera quantity hos ett item i cart
  async decrement(cartItem: CartItem) {
    const index = this.cartItems.findIndex((item: CartItem) => item.id === cartItem.id);
    this.cartItems[index].quantity--;

    //Kolla om quantity är 0. I så fall - ta bort ur cart
    if (this.cartItems[index].quantity === 0) {
      this.cartItems.splice(index, 1);
    }
  }

  // Inkrementera quantity hos ett item i cart
  async increment(cartItem: CartItem) {
    const index = this.cartItems.findIndex((item: CartItem) => item.id === cartItem.id);
    this.cartItems[index].quantity++;
  }
}
