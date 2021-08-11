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
  /*
  combineData() {
    this.cardService.readAllCards().subscribe((cardDeck) => {
      cardDeck.forEach((element, i) => {
        this.cardService.getCard(element.slug).subscribe((card) => {
          element.type = card.metadata.type;
          element.statement = this.replaceImageURLS(
            card.main_version.statement
          );
        });
      });
      this.deck = cardDeck;
      console.log("deck update", this.deck);
    });
  }
*/

  /*
  replaceImageURLS(content) {
    const updatedContent = content.replace(/images/g, "assets/images");
    return updatedContent;
  }
  */
}
