import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

export interface DialogData {
  answer: string;
}
@Component({
  selector: "app-answer-dialog",
  templateUrl: "./answer-dialog.component.html",
  styleUrls: ["./answer-dialog.component.scss"],
})
export class AnswerDialogComponent {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
