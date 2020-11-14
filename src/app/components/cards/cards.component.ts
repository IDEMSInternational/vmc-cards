import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { async } from "rxjs/internal/scheduler/async";
import { CardService } from "src/app/card.service";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.less"],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CardsComponent implements OnInit {
  deck = null;

  constructor(public cardService: CardService) {
    this.combineData();
  }

  ngOnInit(): void {}
  async combineData() {
    await this.cardService.readAllCards().subscribe((data) => {
      //this.deck = data;
      //let d = data;
      data.forEach(async (element, i) => {
        await this.cardService
          .readCardContent(element.slug)
          .subscribe((data) => {
            element.titles = data.title;
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
    const updatedContent = content.replace(/\images/g, "assets/images");
    return updatedContent;
  }
}
