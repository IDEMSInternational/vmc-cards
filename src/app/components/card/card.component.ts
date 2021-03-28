import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";
import { ActivatedRoute } from "@angular/router";
import { Card } from "src/app/models/card.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["../cards.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {

  card: Card;

  constructor(public cardService: CardService, private route: ActivatedRoute) {
    this.cardService.readAllCards().subscribe((data) => {
      this.cardService.getCard(this.route.snapshot.params.slug).subscribe((card) => {
        this.card = this.replaceImageURLs(card);
        console.log(this.card)
      });
    });
  }

  ngOnInit(): void {}

  replaceImageURLs(cardContent: Card): Card {
    const originalContent = JSON.stringify(cardContent);
    const updatedContent = originalContent.replace(/\images/g, "assets/images");
    const newContent = JSON.parse(updatedContent);
    return newContent as Card;
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
