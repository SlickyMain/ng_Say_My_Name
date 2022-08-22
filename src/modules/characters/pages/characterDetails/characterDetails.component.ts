import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, tap } from "rxjs";
import { ICharacter } from "src/models/character";
import { IFavorite } from "src/modules/favorite/favorite.component";
import { CharacterService } from "../../characters.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
	selector: "app-characterDetails",
	templateUrl: "./characterDetails.component.html",
	styleUrls: ["./characterDetails.component.css"],
})
export class CharacterDetailsComponent implements OnInit {
	character$!: Observable<ICharacter>;

	readonly separators = [ENTER, COMMA] as const;

	char_id!: number;

	name!: string;

	tags!: string[];

	addTag(event: MatChipInputEvent): void {
		const value = (event.value || "").trim();
		if (value) {
			this.tags.push(value);
			// Favorite characters
			let taggedCharacters = localStorage.getItem("favor");
			if (taggedCharacters) {
				let parsedTaggedCharacters = JSON.parse(taggedCharacters);
				if (parsedTaggedCharacters.hasOwnProperty(this.char_id)) {
					parsedTaggedCharacters[this.char_id].tags.push(value);
				} else {
					parsedTaggedCharacters[this.char_id] = {
						name: this.name,
						tags: [value],
					};
				}
				localStorage.setItem(
					"favor",
					JSON.stringify(parsedTaggedCharacters),
				);
			} else {
				let newFavor = {
					[this.char_id]: {
						name: this.name,
						tags: [value],
					},
				};
				localStorage.setItem("favor", JSON.stringify(newFavor));
			}
		}
		event.chipInput.clear();
	}

	deleteTag(tag: string) {
		this.tags = this.tags.filter(x => x !== tag);
		let favor: IFavorite = JSON.parse(localStorage.getItem("favor") || "");
		for (let field in favor) {
			if (favor[field].tags.includes(tag)) {
				if (favor[field].tags.length > 1) {
					favor[field].tags.splice(favor[field].tags.indexOf(tag), 1);
				} else {
					delete favor[field];
				}
			}
		}
		localStorage.setItem("favor", JSON.stringify(favor));
	}

	constructor(
		private route: ActivatedRoute,
		private charService: CharacterService,
	) {
		route.paramMap.subscribe(params => {
			this.character$ = this.charService
				.getCharacterById(params.get("id") || "")
				.pipe(
					tap(res => {
						this.char_id = res.char_id;
						this.name = res.name;
						let tagsExist = localStorage.getItem("favor");
						this.tags = tagsExist
							? JSON.parse(tagsExist)[res.char_id]?.tags || []
							: [];
					}),
				);
		});
	}

	ngOnInit() {}
}
