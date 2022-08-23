import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = "dir_Movies";
}
