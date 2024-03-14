import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
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

  allItems: any;
  items: any;
  cartItems: CartItem[] = [];
  total: number = 0;

  //Visa total
  private totalSource = new BehaviorSubject<any>(null);
  total$ = this.totalSource.asObservable();

  updateTotal() {
    let totalPrice: number = 0;

    for (let item of this.cartItems) {
      const price = item.price;
      const quantity = item.quantity;
      const itemPrice = price * quantity;
      totalPrice += itemPrice;
    }

    this.totalSource.next(totalPrice);
  }

  //GET all items
  async getItems(): Promise<Item[]> {
    const result = await firstValueFrom(
      this.http.get(`${environment.apiUrl}groceries`)
    );
    this.items = result;
    this.allItems = result;
    return this.items;
  }

  //Add a button to Filter the store items by type. type is fruit or vegetable
  async filterByTypeVegetable() {
    //visa endast type=vegetable
    // @ts-ignore
    const filteredForVegetables = this.allItems.filter((item: Item) => item.type === 'vegetable');
    this.items = filteredForVegetables;
    return this.items;
  }

  async filterByTypeFruit() {
    //visa endast type=fruit
    // @ts-ignore
    const filteredForVegetables = this.allItems.filter((item: Item) => item.type === 'fruit');
    this.items = filteredForVegetables;
    return this.items;
  }

  //Visa båda typer
  async showAllTypes() {
    this.items = this.allItems;
    return this.items;
  }

  //Add to cart
  async addToCart(item: Item) {
    //see if it is already in cart, then increment quantity instead of adding to cart
    const index = this.cartItems.findIndex(
      (cartItem: CartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
      this.cartItems[index].quantity++;
    }
    //if item is not already in cart, create a new cart item from item and push to cart
    else {
      const cartItem: CartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };

      this.cartItems.push(cartItem);
      this.updateTotal();
    }
  }

  //Get cart items
  getCartItems() {
    return this.cartItems;
  }

  // Dekrementera quantity hos ett item i cart
  async decrement(cartItem: CartItem) {
    const index = this.cartItems.findIndex(
      (item: CartItem) => item.id === cartItem.id
    );
    this.cartItems[index].quantity--;

    //Kolla om quantity är 0. I så fall - ta bort ur cart
    if (this.cartItems[index].quantity === 0) {
      this.cartItems.splice(index, 1);
    }

    this.updateTotal();
  }

  // Inkrementera quantity hos ett item i cart
  async increment(cartItem: CartItem) {
    const index = this.cartItems.findIndex(
      (item: CartItem) => item.id === cartItem.id
    );
    this.cartItems[index].quantity++;

    this.updateTotal();
  }
}
