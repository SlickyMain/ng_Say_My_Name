import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from "@angular/core";
import { Observable } from "rxjs";
import { ICharacter, IFilter } from "src/models/character";
import { CharacterService } from "./characters.service";
import { Sort } from "@angular/material/sort";

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
		this.onlyKeysOfFilters = Object.keys(this.filters);
	}

	characters$!: Observable<ICharacter[]>;

	filtersOpen = false;

	filters: IFilter;

	onlyKeysOfFilters: string[];

	page = 1;

	foundCharacters: ICharacter[] = [];

	queryName = "";

	markAll(turn = true) {
		for (let field in this.filters) {
			this.filters[field] = turn;
		}
	}

	getColumns() {
		let columns = ["img", "name"];
		for (let field in this.filters) {
			if (this.filters[field]) {
				columns.push(field);
			}
		}
		return columns;
	}

	// sortData(sort: Sort) {
	// 	const data = this.desserts.slice();
	// 	if (!sort.active || sort.direction === "") {
	// 		this.sortedData = data;
	// 		return;
	// 	}

	// 	this.sortedData = data.sort((a, b) => {
	// 		const isAsc = sort.direction === "asc";
	// 		switch (sort.active) {
	// 			case "name":
	// 				return compare(a.name, b.name, isAsc);
	// 			case "calories":
	// 				return compare(a.calories, b.calories, isAsc);
	// 			case "fat":
	// 				return compare(a.fat, b.fat, isAsc);
	// 			case "carbs":
	// 				return compare(a.carbs, b.carbs, isAsc);
	// 			case "protein":
	// 				return compare(a.protein, b.protein, isAsc);
	// 			default:
	// 				return 0;
	// 		}
	// 	});
	// }

	ngOnInit() {
		this.characters$ = this.characterService.getAllCharacters();
	}

	ngOnDestroy(): void {
		localStorage.setItem("filters", JSON.stringify(this.filters));
	}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
