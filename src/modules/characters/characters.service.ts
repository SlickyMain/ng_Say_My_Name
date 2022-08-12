import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICharacter } from "src/models/character";

@Injectable({
	providedIn: "root",
})
export class CharacterService {
	constructor(private fetch: HttpClient) {}

	getAllCharacters(): Observable<ICharacter[]> {
		return this.fetch.get<ICharacter[]>(
			"https://www.breakingbadapi.com/api/characters",
		);
	}
}
