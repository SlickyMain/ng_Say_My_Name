import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class RootApiService {
	constructor(private http: HttpClient) {}

	knockToServer<T>(path: string) {
		return this.http.get<T>(API_URL + path)
	}
}
