import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Feedback } from "src/app/models/feedback.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  url = "https://api.apispreadsheets.com/data/10291/";
  public submitFeedback(feedback: Feedback): Observable<Feedback> {
    console.log("data", feedback);
    return this.http.post(this.url, {
      data: [
        {
          name: feedback.name,
          email: feedback.email,
          country: feedback.country,
          feedback: feedback.feedback,
          cardtitle: feedback.cardtitle,
        },
      ],
    });
  }
}
