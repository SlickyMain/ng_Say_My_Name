import { Component, Input, OnInit } from "@angular/core";
import { ICharacter, IFilter } from "src/models/character";
import { Router } from "@angular/router";

@Component({
	selector: "app-singleCharacter",
	templateUrl: "./singleCharacter.component.html",
	styleUrls: ["./singleCharacter.component.css"],
})
export class SingleCharacterComponent implements OnInit {
	constructor(private router: Router) {}

	@Input() character!: ICharacter;

	@Input() filter!: IFilter;

	goToDetails() {
		this.router.navigate(["/person", this.character.char_id], {
			queryParams: {
				"char_id": this.character.char_id,
				"appearance": this.character.appearance,
				"birthday": this.character.birthday,
				"img": this.character.img,
				"name": this.character.name,
				"nickname": this.character.nickname,
				"occupation": this.character.occupation,
				"portrayed": this.character.portrayed,
				"status": this.character.status
			}
		})
	}

	ngOnInit() {
	}
}
