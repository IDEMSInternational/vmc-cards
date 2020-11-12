import { Component, OnInit } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { HttpClient } from "@angular/common/http";
import { CardService } from "src/app/card.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
})
export class HomeComponent implements OnInit {
  cards;
  constructor(private http: HttpClient, private cardService: CardService) {}

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.cardService.readAllCards().subscribe((data) => {
      this.cards = data;
      console.log("cards", this.cards);
    });
  }
}
