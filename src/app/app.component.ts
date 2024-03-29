import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { AppService } from "./services/app.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "vmc-cards";

  constructor(private cdr: ChangeDetectorRef, public appService: AppService) {}
}
