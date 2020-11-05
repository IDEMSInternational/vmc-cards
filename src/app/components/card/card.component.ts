import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.less"],
})
export class CardComponent implements OnInit {
  /*
  suits = ["spade", "diamond", "club", "heart"];
  values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  deck = [];
  */

  content;

  spades = [];
  suit1 = ["spade"];
  values1 = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  diamonds = [];
  suit2 = ["diamond"];
  values2 = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  clubs = [];
  suit3 = ["club"];
  values3 = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  hearts = [];
  suit4 = ["heart"];
  values4 = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //this.deck = this.getDeck();
    this.spades = this.getSpades();
    this.diamonds = this.getDiamonds();
    this.clubs = this.getClubs();
    this.hearts = this.getHearts();
    this.getCardContent();
  }

  /*
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
*/
  getSpades() {
    let spades = [];

    for (let i = 0; i < this.suit1.length; i++) {
      for (let x = 0; x < this.values1.length; x++) {
        let card = { Value: this.values1[x], Suit: this.suit1[i] };
        spades.push(card);
      }
    }

    return spades;
  }

  getDiamonds() {
    let diamonds = [];

    for (let i = 0; i < this.suit2.length; i++) {
      for (let x = 0; x < this.values2.length; x++) {
        let card = { Value: this.values2[x], Suit: this.suit2[i] };
        diamonds.push(card);
      }
    }

    return diamonds;
  }

  getClubs() {
    let clubs = [];

    for (let i = 0; i < this.suit3.length; i++) {
      for (let x = 0; x < this.values3.length; x++) {
        let card = { Value: this.values3[x], Suit: this.suit3[i] };
        clubs.push(card);
      }
    }

    return clubs;
  }

  getHearts() {
    let hearts = [];

    for (let i = 0; i < this.suit4.length; i++) {
      for (let x = 0; x < this.values4.length; x++) {
        let card = { Value: this.values4[x], Suit: this.suit4[i] };
        hearts.push(card);
      }
    }

    return hearts;
  }

  getCardContent(){
    const url = "/assets/card-content/fifteen.json";
    this.http.get(url).subscribe((data) =>{
      this.content = data;
      console.log("card content", this.content);
    })
  }
}
