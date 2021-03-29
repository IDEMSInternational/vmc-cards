import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardComponent } from "./components/card/card.component";
import { AnswerDialogComponent } from "./components/answer-dialog/answer-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CardsComponent } from "./components/cards/cards.component";
import { ScullyLibModule } from "@scullyio/ng-lib";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardsComponent,
    AnswerDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScullyLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
