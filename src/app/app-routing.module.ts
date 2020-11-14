import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CardComponent } from "./components/card/card.component";
import { HomeComponent } from "./components/home/home.component";
import { CardsComponent } from "./components/cards/cards.component";

const routes: Routes = [
  { path: ":suit/:slug", component: CardComponent },
  { path: "cards", component: CardsComponent },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
