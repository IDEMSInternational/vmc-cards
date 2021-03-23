import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CardService {
  cards;
  card;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public readCardContent(slug: string) {
    let slicedSlug = null;
    slicedSlug = slug.replace(".html", "");
    const url = `/assets/card-content/cards/${slicedSlug}.json`;
    if (slicedSlug) {
      this.card = this.http.get(url);
    }
    return this.card;
  }

  public readAllCards() {
    const url = "/assets/card-content/metadata.json";
    this.cards = this.http.get(url);
    return this.cards;
  }
}
