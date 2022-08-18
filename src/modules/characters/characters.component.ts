import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ICharacter, IFilter } from "src/models/character";
import { CharacterService } from "./characters.service";

@Component({
	selector: "app-search",
	templateUrl: "./characters.component.html",
	styleUrls: ["./characters.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit, OnDestroy {
	constructor(private characterService: CharacterService) {
		let savedFilter = localStorage.getItem("filters");
		this.filters = savedFilter
			? JSON.parse(savedFilter)
			: {
					birthday: true,
					nickname: true,
					occupation: true,
					status: true,
					portrayed: true,
			  };
	}
	ngOnDestroy(): void {
		localStorage.setItem("filters", JSON.stringify(this.filters))
	}

	characters$!: Observable<ICharacter[]>;

	filtersOpen = false;

	filters: IFilter;

	page = 1;

	foundCharacters: ICharacter[] = [];

	queryName = "";

	markAll(turn = true) {
		for (let field in this.filters) {
			this.filters[field] = turn;
		}
	}

	ngOnInit() {
		this.characters$ = this.characterService.getAllCharacters();
	}
}
