import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "./app.service";

export type ILanguageCode = "en" | "fr";
//Mapping LanguageCode to language name
export const LANGUAGE_MAPPING: { [code in ILanguageCode]: string } = {
  en: "English",
  fr: "French",
};

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  //Language code corresponding to the current active language
  activeLanguage$ = new BehaviorSubject<ILanguageCode>(null);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._subscribeToRouteLanguageChanges();
    const userLang = localStorage.getItem("vmc_language");
    if (userLang) {
      this.setLanguage(userLang as ILanguageCode);
    }
  }
  //Set Language
  public setLanguage(languageCode: ILanguageCode = "en") {
    if (LANGUAGE_MAPPING[languageCode]) {
      localStorage.setItem("vmc_language", languageCode);
      const { pathname } = this.document.location;
      if (pathname === "/") {
        this.router.navigate([languageCode]);
      } else {
        const oldLang = this.appService.routeParams$.value?.lang;
        const newUrl = pathname.replace(oldLang, languageCode);
        this.router.navigate([newUrl], {
          relativeTo: this.route,
          replaceUrl: true,
        });
      }
      this.activeLanguage$.next(languageCode);
      console.log("Active Language", this.activeLanguage$);
    }
  }

  //Ensure Language is read from current url correctly
  _subscribeToRouteLanguageChanges() {
    this.appService.routeParams$.subscribe((params) => {
      if (params.lang && params.lang !== this.activeLanguage$.value) {
        this.setLanguage(params.lang as ILanguageCode);
      }
    });
  }
}
