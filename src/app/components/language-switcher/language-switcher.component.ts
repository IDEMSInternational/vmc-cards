import { Component, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import {
  LANGUAGE_MAPPING,
  LanguageService,
  ILanguageCode,
} from "src/app/services/language.service";

@Component({
  selector: "app-language-switcher",
  templateUrl: "./language-switcher.component.html",
  styleUrls: ["./language-switcher.component.scss"],
})
export class LanguageSwitcherComponent implements OnInit {
  languagesCodes: ILanguageCode[];
  languageLabels = LANGUAGE_MAPPING;
  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {
    this.languagesCodes = Object.keys(LANGUAGE_MAPPING) as ILanguageCode[];
  }

  selectionChanged(event: MatSelectChange): void {
    const selected: ILanguageCode = event.value;
    if (selected !== this.languageService.activeLanguage$.value) {
      this.languageService.setLanguage(selected);
      setTimeout(()=>{
        window.location.reload();
      }, 400);
      
    }
  }
}
