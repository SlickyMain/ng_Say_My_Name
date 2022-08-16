import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import {
	I18NextService,
	I18NEXT_SERVICE,
	ITranslationService,
} from "angular-i18next";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = "dir_Movies";

	isMenuOpen = false

	viewWidth: number

	setLang(lang: string): void {
		this.i18n.changeLanguage(lang);
	}

	isRu(): boolean {
		return localStorage.getItem("i18nextLng") === "ru";
	}

	constructor(@Inject(I18NEXT_SERVICE) private i18n: ITranslationService) {
		this.viewWidth = window.innerWidth
	}
}
