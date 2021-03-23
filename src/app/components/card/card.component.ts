import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["../cards.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  content;
  card;
  updatedContent;
  cards;

  constructor(public cardService: CardService, private route: ActivatedRoute) {
    this.getCardContent();
    this.getCardsMetaData();
  }

  ngOnInit(): void {}
  getCardContent() {
    this.cardService
      .readCardContent(this.route.snapshot.params.slug)
      .subscribe((data) => {
        this.content = this.replaceImageURLs(data);
      });
  }

  replaceImageURLs(cardContent) {
    const originalContent = JSON.stringify(cardContent);
    const updatedContent = originalContent.replace(/\images/g, "assets/images");
    const newContent = JSON.parse(updatedContent);
    this.updatedContent = newContent;
    return newContent;
  }

  getCardsMetaData() {
    this.cards = this.cardService.readAllCards().subscribe((data) => {
      this.cards = data;
      let ncard = this.cards.find(
        (t) => t.slug === this.route.snapshot.params.slug.replace(".html", "")
      );
      this.card = ncard;

      console.log("cardn", this.card);
    });
  }

  exportCard() {
    window.print();
  }
}
