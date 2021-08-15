import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["../cards.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CardsComponent implements OnInit {
  constructor(public cardService: CardService, public appService: AppService) {}
  ngOnInit() {}
}
