import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardComponent } from "./components/card/card.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CardsComponent } from "./components/cards/cards.component";
import { BookletComponent } from './components/booklet/booklet.component';

@NgModule({
  declarations: [AppComponent, CardComponent, CardsComponent, BookletComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
