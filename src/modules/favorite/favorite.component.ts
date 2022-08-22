import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

export interface IFavorite {
	[key: number | string]: {
		name: string;
		tags: string[];
	};
}

interface ITagFilter {
	[field: string]: boolean;
}

@Component({
	selector: "app-favorite",
	templateUrl: "./favorite.component.html",
	styleUrls: ["./favorite.component.css"],
})
export class FavoriteComponent implements OnInit {
	favoriteCharacters: IFavorite;

	possibleFilters: ITagFilter = {};

	showFilters = false;

	tagsControl = new FormControl("")

	tags: string[] = [];

	checkInter(charTags: string[]) {
		if (!this.tags.length) return true
		return charTags.filter(x => this.tags.includes(x.toLowerCase())).length > 0
	}

	toggleTag(tag: string) {
		if (this.tags.includes(tag.toLowerCase())) {
			this.possibleFilters[tag] = false;
			this.tags = this.tags.filter(x => x !== tag.toLowerCase());
		} else {
			this.possibleFilters[tag] = true;
			this.tags.push(tag.toLowerCase());
		}
	}

	constructor() {
		let isExist = localStorage.getItem("favor");
		this.favoriteCharacters = isExist ? JSON.parse(isExist) : {};
	}

	ngOnInit() {
		for (let field in this.favoriteCharacters) {
			for (let tags of this.favoriteCharacters[field].tags) {
				this.possibleFilters[tags] = false;
			}
		}
	}
}
