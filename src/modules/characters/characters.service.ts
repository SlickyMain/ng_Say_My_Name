import { Injectable } from "@angular/core";
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
	) {
		this.getAllCharacters();
	}

	sharedDataSourse = new BehaviorSubject<ICharacter[]>([]);
	dataStream$ = this.sharedDataSourse.asObservable();

	getAllCharacters() {
		this.rootApi
			.knockToServer<ICharacter[]>("characters")
			.pipe(
				startWith(null),
				catchError((err: HttpErrorResponse) => {
					this.handleError(err);
					return [];
				}),
			)
			.subscribe(data => this.sharedDataSourse.next(data || []));
	}

	getPaginatedCharacters(limit: number, offset: number) {
		this.rootApi
			.knockToServer<ICharacter[]>(
				`characters?limit=${limit}&offset=${offset}`,
			)
			.subscribe(data => this.sharedDataSourse.next(data));
	}

	getCharacterByName(queryString: string) {
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
				this.sharedDataSourse.next(data);
			});
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
		if (err.status === 0 && err.error instanceof ProgressEvent) {
			this.snackBar.open(
				`An Error occured: ${err.statusText}`,
				"Close",
				{ duration: 4000 },
			);
		} else {
			this.snackBar.open(
				`An Error occured: ${err.error.error.message}`,
				"Close",
				{ duration: 4000 },
			);
		}
		console.log(err);
	}
}
