import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CardService } from "src/app/card.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  content;
  state;
  updatedContent;

  constructor(private http: HttpClient, public cardService: CardService) {
    this.getCardContent();
  }

  ngOnInit(): void {
    this.state = history.state;
  }

  getCardContent() {
    this.cardService
      .readCardContent(history.state.data.slug, history.state.data.card_suit)
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
}
