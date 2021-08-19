import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { observable, Observable } from "rxjs";
import { Card, CardMetadata } from "../models/card.model";
import { ILanguageCode } from "./language.service";
import { AppService } from "./app.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CardService {
  cards: CardMetadata[];
  public cards$ = new BehaviorSubject(undefined);

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.init();
  }

  private async init() {
    this._subscribeToRouteChanges();
  }

  public getCard(slug: string, lang: string): Observable<Card> {
    let actualSlug = slug.replace(/.html*/, "");

    const url = `assets/card-content/${lang}/cards/${actualSlug}.json`;
    return this.http.get(url).pipe(
      map((cardContent) => {
        console.log(cardContent);
        const cardMetadata = this.cards.find(
          (cardMetadata) => cardMetadata.slug === actualSlug
        );
        console.log(cardMetadata);
        return { ...cardContent, ...cardMetadata };
      })
    );
  }

  public async readAllCards(language: ILanguageCode) {
    // notify that the cards are not yet loaded
    this.cards$.next(undefined);
    const url = `assets/card-content/${language}/metadata.json`;

    this.cards = await this.http
      .get<CardMetadata[]>(url)
      .toPromise()
      .catch(() => {
        this.router.navigate(["/"]);
        return [];
      });
    this.cards$.next(this.cards);
  }

  public _subscribeToRouteChanges() {
    this.appService.routeParams$.subscribe(async (params) => {
      if (params.lang) {
        console.log("Route changed");
        await this.readAllCards(params.lang as any);
      }
    });
    return true;
  }
}
