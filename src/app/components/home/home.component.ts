import { Component, OnInit } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
})
export class HomeComponent implements OnInit {
  cards;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards(){
    const url = "/assets/card-content/metadata.json";
    this.http.get(url).subscribe((data) =>{
      this.cards = data;
      console.log("cards", this.cards);
    })
  }
}
