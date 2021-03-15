import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Card, CardMetadata } from "./models/card.model";

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

  public getCard(slug: string): Observable<Card> {
    let actualSlug = slug;
    const cardRegex = /([A|2-9|10|J|Q|K]+)([C|S|H|D]+)/;
    const matchResult = slug.toUpperCase().match(cardRegex);
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
    return this.http.get(url)
      .pipe(map((cardContent) => {
        const cardMetadata = this.cards.find((cardMetadata) => cardMetadata.slug === actualSlug);
        return { ...cardContent, ...cardMetadata };
      }));
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
