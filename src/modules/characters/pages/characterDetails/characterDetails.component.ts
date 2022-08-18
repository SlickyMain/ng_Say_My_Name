import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
	character!: ICharacter;

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
			localStorage.setItem(
				`char${this.character.char_id}`,
				JSON.stringify(this.tags),
			);

			// Favorite heroes
			let selectedHeroes = localStorage.getItem("favor");
			if (selectedHeroes) {
				let parsedHeroes = JSON.parse(selectedHeroes);
				if (parsedHeroes.hasOwnProperty(this.character.char_id)) {
					parsedHeroes[this.character.char_id].tags.push(newTag);
				} else {
					parsedHeroes[this.character.char_id] = {
						name: this.character.name,
						tags: [newTag],
					};
				}
				localStorage.setItem("favor", JSON.stringify(parsedHeroes));
			} else {
				let newFavor = {
					[this.character.char_id]: {
						name: this.character.name,
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
		localStorage.setItem(
			`char${this.character.char_id}`,
			JSON.stringify(this.tags),
		);
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

	isString(value: any): boolean {
		return typeof value === "string";
	}

	constructor(
		private route: ActivatedRoute,
		private charService: CharacterService,
	) {
		route.paramMap.subscribe(params => {
			this.charService
				.getCharacterById(params.get("id") || "")
				.subscribe(result => {
					this.character = result[0];
					this.tags = JSON.parse(
						localStorage.getItem(`char${result[0].char_id}`) || "",
					);
				});
		});
	}

	ngOnInit() {}
}
