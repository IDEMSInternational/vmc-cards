import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["../cards.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CardsComponent {
  deck = null;

  constructor(public cardService: CardService) {
    this.combineData();
  }

  combineData() {
    this.cardService.readAllCards().subscribe((data) => {
      data.forEach((element, i) => {
        this.cardService.readCardContent(element.slug).subscribe((data) => {
          element.type = data.metadata.type;
          element.statement = this.replaceImageURLS(
            data.main_version.statement
          );
        });
      });
      this.deck = data;
      console.log("deck update", this.deck);
    });
  }

  replaceImageURLS(content) {
    const updatedContent = content.replace(/images/g, "assets/images");
    return updatedContent;
  }
}
