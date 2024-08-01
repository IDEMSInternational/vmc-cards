import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/services/card.service";
import { AppService } from "src/app/services/app.service";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["../cards.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CardsComponent implements OnInit {
  languageCode: string;
  constructor(public cardService: CardService, public appService: AppService, public languageService: LanguageService) { }
  ngOnInit() {
    this.subscribeToLanguageChanges()
  }
  subscribeToLanguageChanges() {
    this.languageService.activeLanguage$.subscribe((languageCode) => {
      this.languageCode = languageCode
    })
  }
}
