import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-characterDetails",
	templateUrl: "./characterDetails.component.html",
	styleUrls: ["./characterDetails.component.css"],
})
export class CharacterDetailsComponent implements OnInit {

    private querySubscription: Subscription;

	character: any

	tags: string[]

	addTag() {
		
	}

	constructor(private route: ActivatedRoute) {
		this.querySubscription = route.queryParams.subscribe(params => {
			this.character = params
		})
		try {
			this.tags = JSON.parse(localStorage.getItem(`char${this.character.char_id}`) || "")
		} catch (error) {
			this.tags = []
		}
		
	}

	ngOnInit() {
	}
}
