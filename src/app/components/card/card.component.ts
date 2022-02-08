import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/services/card.service";
import { ActivatedRoute } from "@angular/router";
import { Card } from "src/app/models/card.model";
import { Feedback } from "src/app/models/feedback.model";
import { FeedbackService } from "src/app/services/feedback.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["../cards.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  card: Card | undefined;
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
  showAboutContent: Boolean = false;

  showExtension1Content: Boolean = false;
  showExtension2Content: Boolean = false;
  showMainContent: Boolean = true;

  //Extension 1 variables
  showExtension1Hint: Boolean = false;
  showExtension1Answer: Boolean = false;
  showExtension1Explanation: Boolean = false;

  //Extension 2 variables
  showExtension2Hint: Boolean = false;
  showExtension2Answer: Boolean = false;
  showExtension2Explanation: Boolean = false;

  answer: string;
  durationInSeconds = 5;

  private lang;
  private slug;

  constructor(
    public cardService: CardService,
    private route: ActivatedRoute,
    public feedbackService: FeedbackService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.lang = this.route.snapshot.params.lang;
    this.slug = this.route.snapshot.params.slug;
    this.displayCard();
  }

  displayCard() {
    this.cardService
      .getCard(this.slug, this.lang)
      .subscribe((card) => (this.card = card));
  }

  showHint() {
    this.showHintContent = this.showHintContent ? false : true;
    this.showMainContent = true;

  }
  showAnswer() {
    this.showAnswerContent = this.showAnswerContent ? false : true;
  }
  showExplanation() {
    this.showExplanationContent = this.showExplanationContent ? false : true;
  }
  showReferences() {
    this.showReferencesContent = this.showReferencesContent ? false : true;
  }
  showAbout() {
    this.showAboutContent = this.showAboutContent ? false : true;
  }
  showExtension() {
    this.showExtensionsContent = this.showExtensionsContent ? false : true;
    this.showHintContent = false;
    this.showAnswerContent = false;
    this.showExplanationContent = false;
    this.showExtension1();
  }

  showMain() {
    this.showMainContent = this.showMainContent ? false : true;
    this.showExtension1Content = false;
    this.showExtension2Content = false;
  }
  showExtension1() {
    this.showExtension1Content = this.showExtension1Content ? false : true;
    // this.showExtensionsContent = this.showExtensionsContent ? false : true;
    this.showExtension2Content = false;
    this.showMainContent = false;
  }
  showExtension2() {
    this.showExtension2Content = this.showExtension2Content ? false : true;
    this.showExtension1Content = false;
    this.showMainContent = false;
  }
  extension1Hint() {
    this.showExtension1Hint = this.showExtension1Hint ? false : true;
  }
  extension1Answer() {
    this.showExtension1Answer = this.showExtension1Answer ? false : true;
  }
  extension1Explanation() {
    this.showExtension1Explanation = this.showExtension1Explanation
      ? false
      : true;
  }

  extension2Hint() {
    this.showExtension2Hint = this.showExtension2Hint ? false : true;
  }
  extension2Answer() {
    this.showExtension2Answer = this.showExtension2Answer ? false : true;
  }
  extension2Explanation() {
    this.showExtension2Explanation = this.showExtension2Explanation
      ? false
      : true;
  }

  onSubmit() {
    this.feedback.cardtitle = this.card.title;
    this.feedback.suit = this.card.slug;
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
