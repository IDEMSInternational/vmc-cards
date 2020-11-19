import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "vmc-cards";
  printStyle = "Web";
  isPrinting = false;

  constructor(private cdr: ChangeDetectorRef) {}

  export() {
    window.onbeforeprint = () => {
      this.togglePrintMode();
    };
    window.onafterprint = () => {
      this.togglePrintMode();
    };
    // use timeout to allow style updates after isPrinting is enabled
    setTimeout(() => {
      window.print();
    }, 50);
  }
  togglePrintMode() {
    this.isPrinting = !this.isPrinting;
    this.cdr.detectChanges();
  }
}
