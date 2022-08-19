import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICharacter } from "src/models/character";

@Injectable({
	providedIn: "root",
})
export class CharacterService {
	constructor(private http: HttpClient) {}

	getAllCharacters(): Observable<ICharacter[]> {
		return this.http.get<ICharacter[]>(
			"https://www.breakingbadapi.com/api/characters",
		);
	}

	getCharacterById(id: string): Observable<ICharacter> {
		return this.http
			.get<ICharacter>(
				`https://www.breakingbadapi.com/api/characters/${id}`,
			)
			.pipe(map(res => res[0]));
	}
}
