import { EventEmitter, Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, catchError, map, Observable, startWith } from "rxjs";
import { RootApiService } from "src/app/rootApi.service";
import { ICharacter } from "src/models/character";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class CharacterService {
	constructor(
		private rootApi: RootApiService,
		private snackBar: MatSnackBar,
	) {}

	sharedDataSourse = new BehaviorSubject<ICharacter[]>([])
	dataStream$ = this.sharedDataSourse.asObservable()

	getAllCharacters() {
		return this.rootApi
			.knockToServer<ICharacter[]>("characters")
			.pipe(
				startWith(null),
				catchError((err: HttpErrorResponse) => {
					this.handleError(err);
					return [];
				}),
			)
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
	) {
		queryString = queryString.replace(" ", "+");
		this.rootApi
			.knockToServer<ICharacter[]>(`characters?name=${queryString}`)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					this.handleError(err);
					return [];
				}),
			)
			.subscribe(data => {
				this.sharedDataSourse.next(data)
			})
	}

	getCharacterById(id: string): Observable<ICharacter> {
		return this.rootApi.knockToServer<ICharacter>(`characters/${id}`).pipe(
			map(res => res[0]),
			catchError((err: HttpErrorResponse) => {
				this.handleError(err);
				return [];
			}),
		);
	}

	handleError(err: HttpErrorResponse) {
		this.snackBar.open(
			`An Error occured: ${err.error.error.message}`,
			"Close",
			{ duration: 4000 },
		);
		console.log(err);
	}
}
