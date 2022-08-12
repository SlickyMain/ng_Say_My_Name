import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { RefDirective } from "src/directives/Ref.directive";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
	selector: "app-characterDetails",
	templateUrl: "./characterDetails.component.html",
	styleUrls: ["./characterDetails.component.css"],
})
export class CharacterDetailsComponent implements OnInit {
	private querySubscription: Subscription;

	character: any;

	tags: string[];

	@ViewChild(RefDirective) container!: RefDirective;

	showModal() {
		this.container.containerRef.clear();
		const component = this.container.containerRef.createComponent(ModalComponent);
		component.instance.isNeedToDestroy.subscribe((close: boolean) => {
			if (close) component.destroy()
		})
		component.instance.newTagEvent.subscribe((newTag: string) => {
			this.tags.push(newTag)
			localStorage.setItem(`char${this.character.char_id}`, JSON.stringify(this.tags))
			component.destroy()
		})
	}

	deleteTag(tag: string) {
		this.tags = this.tags.filter(x => x !== tag)
		localStorage.setItem(`char${this.character.char_id}`, JSON.stringify(this.tags))
	}

	constructor(private route: ActivatedRoute) {
		this.querySubscription = route.queryParams.subscribe(params => {
			this.character = params;
		});
		try {
			this.tags = JSON.parse(
				localStorage.getItem(`char${this.character.char_id}`) || "",
			);
		} catch (error) {
			this.tags = [];
		}
	}

	ngOnInit() {}
}
