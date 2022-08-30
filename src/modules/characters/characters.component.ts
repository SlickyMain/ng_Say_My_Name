import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from "@angular/core";
import { ICharacter, IFilter } from "src/models/character";
import { CharacterService } from "./characters.service";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { fromEvent, debounce, interval, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
	selector: "app-search",
	templateUrl: "./characters.component.html",
	styleUrls: ["./characters.component.css"],
})
export class CharactersComponent implements OnInit, OnDestroy, AfterViewInit {
	constructor(
		private characterService: CharacterService,
		private router: Router,
	) {
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

	characters = new MatTableDataSource<ICharacter>();
	@ViewChild("paginator") paginator!: MatPaginator;
	pageSizeByDefault = 5;

	filtersOpen = false;
	filters: IFilter;
	onlyKeysOfFilters: string[];

	markAll(turn = true) {
		for (let field in this.filters) {
			this.filters[field] = turn;
		}
	}

	redirect(character: ICharacter) {
		this.router.navigate([`person/${character.char_id}`]);
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

	ngOnInit() {
		// this.characterService.getPaginatedCharacters(
		// 	this.pageSizeByDefault,
		// 	0,
		// 	this.characters,
		// );
		this.characterService.getAllCharacters().subscribe(data => {
			this.characters.data = data || []
		});
		this.characterService.dataStream$.subscribe(data => {
			this.characters.data = data
		})
	}

	ngOnDestroy(): void {
		localStorage.setItem("filters", JSON.stringify(this.filters));
	}

	ngAfterViewInit(): void {
		this.paginator.pageSize = this.pageSizeByDefault;
		this.characters.paginator = this.paginator;
	}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
