import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject,
	ViewChild,
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { fromEvent, interval, Observable, Subscription } from "rxjs";
import { debounce, map, shareReplay } from "rxjs/operators";
import { I18NEXT_SERVICE, ITranslationService } from "angular-i18next";
import { CharacterService } from "src/modules/characters/characters.service";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements AfterViewInit {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay(),
		);

	@ViewChild("search") search!: ElementRef;
	inputs!: Subscription;

	setLang(lang: string): void {
		this.i18n.changeLanguage(lang);
	}

	isRu(): boolean {
		return localStorage.getItem("i18nextLng") === "ru";
	}

	constructor(
		@Inject(I18NEXT_SERVICE) private i18n: ITranslationService,
		private breakpointObserver: BreakpointObserver,
		private characterService: CharacterService
	) {}

	ngAfterViewInit(): void {
		this.inputs = fromEvent(this.search.nativeElement, "input")
			.pipe(debounce(() => interval(300)))
			.subscribe(() => {
				this.characterService.getCharacterByName(
					this.search.nativeElement.value,
				);
			});
	}
}
