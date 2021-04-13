import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";
import { ActivatedRoute } from "@angular/router";
import { Card } from "src/app/models/card.model";
import { Feedback } from "src/app/models/feedback.model";
import { FeedbackService } from "src/app/feedback.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["../cards.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  card: Card;
  //feedback: Feedback;
  public feedback: Feedback = {
    name: "",
    country: "",
    email: "",
    feedback: "",
    cardtitle: "",
  };

  showHintContent: Boolean = false;
  showAnswerContent: Boolean = false;
  showExplanationContent: Boolean = false;
  showExtensionsContent: Boolean = false;
  showReferencesContent: Boolean = false;
  answer: string;
  durationInSeconds = 5;

  constructor(
    public cardService: CardService,
    private route: ActivatedRoute,
    public feedbackService: FeedbackService,
    private _snackBar: MatSnackBar
  ) {
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
  showReferences(){
    this.showReferencesContent = this.showReferencesContent ? false : true;
  }
  showExtension() {
    this.showExtensionsContent = this.showExtensionsContent ? false : true;
    this.showHintContent = false;
    this.showAnswerContent = false;
    this.showExplanationContent = false;
  }
  onSubmit() {
    this.feedback.cardtitle = this.card.title;
    this.feedbackService.submitFeedback(this.feedback).subscribe(
      (response) => {
        console.log("response", response);
        this._snackBar.open("Message successfully sent!", "VMC", {
          duration: 3000,
        });
      },
      (error) => {
        this._snackBar.open("There was an error!", "VMC", {
          duration: 3000,
        });
      }
    );

    // console.log("You submitted", JSON.stringify(this.feedback));
  }
}
