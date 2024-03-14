import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreenItemComponent } from './green-item/green-item.component';
import { GreenListComponent } from './green-list/green-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartItemComponent } from './cart-item/cart-item.component'


@NgModule({
  declarations: [
    GreenItemComponent,
    GreenListComponent,
    CartListComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    GreenListComponent,
    GreenItemComponent,
    CartListComponent,
    CartItemComponent
  ]
})
export class GreensModule { }
