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
    /*
    const data = document.getElementById("cardPDF");
    console.log("id ", data);
    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      // let pdf = new jspdf("p", "mm", "a4");
      // pdf.addImage(contentDataURL, "png", 0, 0, 210, 0); a4
      // pdf.addImage(contentDataURL, "png", 0, 0, 63, 0);  -- deck szie

      //pdf.addImage(contentDataURL, "png", 0, 0, 105, 0); - a6

      let pdf = new jspdf("p", "mm", [63.5, 88.8]);
      pdf.addImage(contentDataURL, "png", 0, 0, 63, 0);
      pdf.save(this.card.title);
    });
    */
  }
}
