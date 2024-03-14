import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GreensModule } from './greens/greens.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GreensModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
