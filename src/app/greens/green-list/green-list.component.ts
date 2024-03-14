import { Component } from '@angular/core';
import { GreensService } from '../services/greens.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-green-list',
  templateUrl: './green-list.component.html',
  styleUrls: ['./green-list.component.css'],
})
export class GreenListComponent {
  constructor(private readonly greensService: GreensService) {
    this.fetchItems();
  }

  items: any;

  //Vänta på att data hämtats
  async fetchItems() {
    this.items = await this.greensService.getItems();
  }

  //Kod för att lägga till items i cart
  addToCart(item: Item) {
    this.greensService.addToCart(item);
    this.items = this.greensService.items;
  }

  //Filtrera efter typ vegetable
  filterByTypeVegetable() {
    this.greensService.filterByTypeVegetable();
    this.items = this.greensService.items;
  }

  filterByTypeFruit() {
    this.greensService.filterByTypeFruit();
    this.items = this.greensService.items;
  }

  //Visa båda typer
  showAllTypes() {
    this.greensService.showAllTypes();
    this.items = this.greensService.items;
  }

  //Sortera efter pris
  sortByPrice() {
    this.greensService.sortByPrice();
    this.items = this.greensService.items;
  }

  //Sortera efter namn
  sortByName() {
    this.greensService.sortByName();
    this.items = this.greensService.items;
  }
}
