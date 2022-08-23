import { Component, Inject } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { I18NEXT_SERVICE, ITranslationService } from "angular-i18next";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay(),
		);

	setLang(lang: string): void {
		this.i18n.changeLanguage(lang);
	}

	isRu(): boolean {
		return localStorage.getItem("i18nextLng") === "ru";
	}

	constructor(
		@Inject(I18NEXT_SERVICE) private i18n: ITranslationService,
		private breakpointObserver: BreakpointObserver,
	) {}
}
