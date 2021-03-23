import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CardComponent } from "./components/card/card.component";
import { CardsComponent } from "./components/cards/cards.component";
import { BookletComponent } from "./components/booklet/booklet.component";

const routes: Routes = [
  { path: "p/booklet", component: BookletComponent },
  { path: "card/:slug", component: CardComponent },
  { path: "", component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
