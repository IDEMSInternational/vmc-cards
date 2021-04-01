import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";
import { ActivatedRoute } from "@angular/router";
import { Card } from "src/app/models/card.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["../cards.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  card: Card;
  showHintContent: Boolean = false;
  showAnswerContent: Boolean = false;
  showExplanationContent: Boolean = false;
  showExtensionsContent: Boolean = false;
  answer: string;
  durationInSeconds = 5;

  constructor(public cardService: CardService, private route: ActivatedRoute) {
    this.cardService.readAllCards().subscribe((data) => {
      this.cardService
        .getCard(this.route.snapshot.params.slug)
        .subscribe((card) => {
          this.card = this.replaceImageURLs(card);
          console.log(this.card);
        });
    });
  }

  ngOnInit(): void {}

  replaceImageURLs(cardContent: Card): Card {
    const originalContent = JSON.stringify(cardContent);
    const updatedContent = originalContent.replace(/\images/g, "assets/images");
    const newContent = JSON.parse(updatedContent);
    return newContent as Card;
  }
  showHint() {
    this.showHintContent = this.showHintContent ? false : true;
  }
  showAnswer() {
    this.showAnswerContent = this.showAnswerContent ? false : true;
  }
  showExplanation() {
    this.showExplanationContent = this.showExplanationContent ? false : true;
  }
  showExtension() {
    this.showExtensionsContent = this.showExtensionsContent ? false : true;
    this.showHintContent = false;
    this.showAnswerContent = false;
    this.showExplanationContent = false;
  }
}
