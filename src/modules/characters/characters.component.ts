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
import {
	fromEvent,
	debounce,
	scan,
	interval,
	switchMap,
	Subscription,
} from "rxjs";

@Component({
	selector: "app-search",
	templateUrl: "./characters.component.html",
	styleUrls: ["./characters.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit, OnDestroy, AfterViewInit {
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

	characters = new MatTableDataSource<ICharacter>();
	@ViewChild("paginator") paginator!: MatPaginator;
	pageSizeByDefault = 5

	filtersOpen = false;
	filters: IFilter;
	onlyKeysOfFilters: string[];

	@ViewChild("search") search!: ElementRef;
	queryField = "";
	inputs!: Subscription;

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

	ngOnInit() {
		// this.characterService.getPaginatedCharacters(
		// 	this.pageSizeByDefault,
		// 	0,
		// 	this.characters,
		// );
		this.characterService.getAllCharacters(this.characters)
	}

	ngOnDestroy(): void {
		localStorage.setItem("filters", JSON.stringify(this.filters));
	}

	ngAfterViewInit(): void {
		this.paginator.pageSize = this.pageSizeByDefault
		this.characters.paginator = this.paginator;
		this.inputs = fromEvent(this.search.nativeElement, "input")
			.pipe(debounce(() => interval(300)))
			.subscribe(() => {
				this.characterService.getCharacterByName(
					this.search.nativeElement.value,
					this.characters,
				);
			});
	}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
