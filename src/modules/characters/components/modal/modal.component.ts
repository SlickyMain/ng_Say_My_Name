import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements AfterViewInit {
	constructor() {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus();
	}

	@ViewChild('focusThis') input!: ElementRef<HTMLInputElement>;

	@Output() newTagEvent = new EventEmitter<string>()

	@Output() isNeedToDestroy = new EventEmitter<boolean>()

	throwNewTagToParent () {
		if (this.input.nativeElement.value.trim().length && this.input.nativeElement.value.split(" ").length < 2) {
			this.newTagEvent.emit(this.input.nativeElement.value)
		}
		else {
			this.input.nativeElement.classList.add("police")
			setTimeout(() => {
				this.input.nativeElement.classList.remove("police")
			}, 1000)
		}
	}

}
