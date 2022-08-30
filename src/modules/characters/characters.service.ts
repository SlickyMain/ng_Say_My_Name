import { Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import {
	map,
	Observable,
	startWith,
} from "rxjs";
import { RootApiService } from "src/app/rootApi.service";
import { ICharacter } from "src/models/character";

@Injectable({
	providedIn: "root",
})
export class CharacterService {
	constructor(private rootApi: RootApiService) {}

	getAllCharacters(dataSource: MatTableDataSource<ICharacter>) {
		this.rootApi
			.knockToServer<ICharacter[]>("characters")
			.pipe(startWith(null))
			.subscribe(data => {
				dataSource.data = data || [];
			});
	}

	getPaginatedCharacters(
		limit: number,
		offset: number,
		dataSource: MatTableDataSource<ICharacter>,
	) {
		this.rootApi
			.knockToServer<ICharacter[]>(
				`characters?limit=${limit}&offset=${offset}`,
			)
			.subscribe(data => (dataSource.data = data));
	}

	getCharacterByName(
		queryString: string,
		dataSource: MatTableDataSource<ICharacter>,
	) {
		queryString = queryString.replace(" ", "+");
		this.rootApi
			.knockToServer<ICharacter[]>(`characters?name=${queryString}`)
			.subscribe(data => (dataSource.data = data));
	}

	getCharacterById(id: string): Observable<ICharacter> {
		return this.rootApi
			.knockToServer<ICharacter>(`characters/${id}`)
			.pipe(map(res => res[0]));
	}
}
