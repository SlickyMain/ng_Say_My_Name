import {
	AfterViewInit,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
} from "@angular/core";
import { ICharacter, IFilter } from "src/models/character";
import { CharacterService } from "./characters.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
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
	subscriptionOnStream!: Subscription

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
		// );
		this.subscriptionOnStream = this.characterService.dataStream$.subscribe(data => {
			this.characters.data = data
		})
	}

	ngOnDestroy(): void {
		localStorage.setItem("filters", JSON.stringify(this.filters));
		this.subscriptionOnStream.unsubscribe()
	}

	ngAfterViewInit(): void {
		this.paginator.pageSize = this.pageSizeByDefault;
		this.characters.paginator = this.paginator;
	}
}
