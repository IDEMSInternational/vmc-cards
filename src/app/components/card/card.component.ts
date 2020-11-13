import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CardComponent implements OnInit {
  content;
  state;
  updatedContent;
  cards;

  constructor(public cardService: CardService, private route: ActivatedRoute) {
    this.getCardContent();
    this.getCardsMetaData();
  }

  ngOnInit(): void {}

  getCardContent() {
    this.cardService
      .readCardContent(
        this.route.snapshot.params.slug,
        this.route.snapshot.params.suit
      )
      .subscribe((data) => {
        this.content = data;
        this.replaceImageURLs(this.content);
        console.log("card content", this.content);
      });
  }

  async replaceImageURLs(cardContent) {
    const originalContent = JSON.stringify(cardContent);
    const updatedContent = originalContent.replace(/\images/g, "assets/images");
    const newContent = JSON.parse(updatedContent);
    console.log("contentx", newContent);
    this.updatedContent = newContent;
    return newContent;
  }

  getCardsMetaData() {
    this.cards = this.cardService.readAllCards().subscribe((data) => {
      this.cards = data;
      let ncard = this.cards.find(
        (t) => t.slug === this.route.snapshot.params.slug
      );
      this.state = ncard;
    });
  }
}
