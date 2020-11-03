import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  suits = ["spades", "diamonds", "clubs", "hearts"];
  values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  constructor() {}

  ngOnInit(): void {
    console.log("deck", this.getDeck());
  }

  getDeck() {
    let deck = [];

    for (let i = 0; i < this.suits.length; i++) {
      for (let x = 0; x < this.values.length; x++) {
        let card = { Value: this.values[x], Suit: this.suits[i]};
        deck.push(card);
      }
    }

    return deck;
  }
}
