import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AppService {
  title$ = new BehaviorSubject<string>("VMC Cards");
  routeParams$ = new BehaviorSubject<IRouteParams>({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._processRouteChanges();
  }
  setTitle(title: string = "VMC Cards") {
    this.title$.next(title);
  }

  private _processRouteChanges() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //update activated route to reflect routed component tree
        this.route = this.route.root.firstChild;
        const params = this.route.root.firstChild.snapshot
          .params as IRouteParams;
        this.routeParams$.next(params);
        // set default title when not on card page
        if (!params.slug) {
          this.setTitle();
        }
      }
    });
  }
}

interface IRouteParams {
  lang?: string;
  slug?: string;
}
