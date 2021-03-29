import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { CardService } from "src/app/card.service";
import { ActivatedRoute } from "@angular/router";
import { Card } from "src/app/models/card.model";
import { AnswerDialogComponent } from "../answer-dialog/answer-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

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
  extensionsContent: Boolean = false;
  answer: string;
  durationInSeconds = 5;

  constructor(
    public _snackbar: MatSnackBar,
    public cardService: CardService,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
  openDialog(): void {
    const dialogRef = this.dialog.open(AnswerDialogComponent, {
      width: "250px",
      data: { answer: this.answer },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.answer = result;
      console.log("You chose ", this.answer);
      if (this.answer === this.card.main_version.correct_answer) {
        this._snackbar.open("You got it correct! ", "VMC", {
          duration: 3000,
          panelClass: ["blue-snackbar"],
        });
      } else {
        this._snackbar.open("You may try again! ", "VMC", {
          duration: 3000,
        });
      }
    });
  }
}
