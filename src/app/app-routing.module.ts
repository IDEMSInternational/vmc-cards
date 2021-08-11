import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CardComponent } from "./components/card/card.component";
import { CardsComponent } from "./components/cards/cards.component";

const routes: Routes = [
  { path: ":lang/card/:slug", component: CardComponent },
  { path: ":lang", component: CardsComponent },
  { path: "", redirectTo: "en", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
