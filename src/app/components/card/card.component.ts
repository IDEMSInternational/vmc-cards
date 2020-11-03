import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"],
})
export class CardComponent implements OnInit {
  suits = ["spade", "diamond", "club", "heart"];
  values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  deck = [];
  constructor() {}

  ngOnInit(): void {
    this.deck = this.getDeck();
    console.log(this.deck);

  }

  getDeck() {
    let deck = [];

    for (let i = 0; i < this.suits.length; i++) {
      for (let x = 0; x < this.values.length; x++) {
        let card = { Value: this.values[x], Suit: this.suits[i] };
        deck.push(card);
      }
    }

    return deck;
  }
}
