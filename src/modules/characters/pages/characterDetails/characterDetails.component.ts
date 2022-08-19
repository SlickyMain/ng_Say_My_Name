import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, tap } from "rxjs";
import { RefDirective } from "src/directives/Ref.directive";
import { ICharacter } from "src/models/character";
import { IFavorite } from "src/modules/favorite/favorite.component";
import { CharacterService } from "../../characters.service";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
	selector: "app-characterDetails",
	templateUrl: "./characterDetails.component.html",
	styleUrls: ["./characterDetails.component.css"],
})
export class CharacterDetailsComponent implements OnInit {
	character$!: Observable<ICharacter>;

	char_id!: number;

	name!: string;

	tags!: string[];

	@ViewChild(RefDirective) container!: RefDirective;

	showModal() {
		this.container.containerRef.clear();
		const component =
			this.container.containerRef.createComponent(ModalComponent);
		component.instance.isNeedToDestroy.subscribe((close: boolean) => {
			if (close) component.destroy();
		});
		component.instance.newTagEvent.subscribe((newTag: string) => {
			this.tags.push(newTag);
			// Favorite characters
			let taggedCharacters = localStorage.getItem("favor");
			if (taggedCharacters) {
				let parsedTaggedCharacters = JSON.parse(taggedCharacters);
				if (parsedTaggedCharacters.hasOwnProperty(this.char_id)) {
					parsedTaggedCharacters[this.char_id].tags.push(newTag);
				} else {
					parsedTaggedCharacters[this.char_id] = {
						name: this.name,
						tags: [newTag],
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
						tags: [newTag],
					},
				};
				localStorage.setItem("favor", JSON.stringify(newFavor));
			}
			component.destroy();
		});
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
