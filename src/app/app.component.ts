import { Component, ViewChild } from "@angular/core";
import { CardsComponent } from "./components/cards/cards.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent {
  title = "vmc-cards";

  export(){
    window.print();
  }
}
