import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CardService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public readCardContent(slug: string, suit: string) {
    const url = `/assets/card-content/${suit}/${slug}.json`;
    const res = this.http.get(url);
    return res;
  }

  public readAllCards() {
    const url = "/assets/card-content/metadata.json";
    const res = this.http.get(url);
    return res;
  }
}
