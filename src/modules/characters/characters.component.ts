import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ICharacter, IFilter } from "src/models/character";
import { CharacterService } from "./characters.service";

@Component({
	selector: "app-search",
	templateUrl: "./characters.component.html",
	styleUrls: ["./characters.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit {
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

	characters$!: Observable<ICharacter[]>;

	filtersOpen = false;

	filters: IFilter;

	page = 1;

	foundCharacters: ICharacter[] = [];

	queryName = "";

	markAll(turn = true) {
		for (let field in this.filters) {
			this.filters[field].enabled = turn;
		}
	}

	ngOnInit() {
		this.characters$ = this.characterService.getAllCharacters();
	}
}
