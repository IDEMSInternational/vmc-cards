import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CardService } from "src/app/card.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"],
})
export class CardComponent implements OnInit {
  content;

  constructor(private http: HttpClient, public cardService: CardService) {}

  ngOnInit(): void {
    this.getCardContent();
  }

  getCardContent() {
    this.cardService
      .readCardContent("honey-bees", "clubs")
      .subscribe((data) => {
        this.content = data;
        console.log("card content", this.content);
      });
  }
}
