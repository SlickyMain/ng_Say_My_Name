import { Component, OnInit } from "@angular/core";

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
	favoriteHeroes: IFavorite;

	possibleFilters: ITagFilter = {};

	showFilters = false;

	tags: string[] = [];

	checkInter(heroTags: string[]) {
		if (!this.tags.length) return true
		return heroTags.filter(x => this.tags.includes(x.toLowerCase())).length > 0
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
		this.favoriteHeroes = isExist ? JSON.parse(isExist) : {};
	}

	ngOnInit() {
		for (let field in this.favoriteHeroes) {
			for (let tags of this.favoriteHeroes[field].tags) {
				this.possibleFilters[tags] = false;
			}
		}
	}
}
