import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";
import { ActivatedRoute } from "@angular/router";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"],
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
        this.content = data;
        this.replaceImageURLs(this.content);
        //console.log("card content", this.content);
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
      this.card = ncard;
    });
  }

  exportCard() {
    window.print();
  }
}
