import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

type CardMetadata = {
  "title": string,
  "type": string,
  "slug": string,
  "card_value": string,
  "card_suit": "club" | "diamond" | "spade" | "heart",
  statement?: string;
}

@Injectable({
  providedIn: "root",
})
export class CardService {
  cards: CardMetadata[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public readCardContent(slug: string): Observable<any> {
    let actualSlug = slug;
    const cardRegex = /([A|2-9|10|J|Q|K]+)([C|S|H|D]+)/;
    const matchResult = slug.match(cardRegex);
    if (matchResult) {
      let suitMap = {
        "C": "club",
        "S": "spade",
        "H": "heart",
        "D": "diamond"
      };
      let value = matchResult[1];
      let suit = suitMap[matchResult[2]];
      if (value && suit) {
        let matchingCard = this.cards.find((card) => {
          return card.card_suit === suit && card.card_value === value;
        });
        actualSlug = matchingCard.slug;
      }
    }
    const url = `assets/card-content/cards/${actualSlug}.json`;
    return this.http.get(url);
  }

  public readAllCards(): Observable<CardMetadata[]> {
    const url = "assets/card-content/metadata.json";
    let observable = this.http.get<CardMetadata[]>(url, { observe: "body" });
    observable.subscribe((cards: CardMetadata[]) => {
      this.cards = cards;
    });
    return observable;
  }
}
