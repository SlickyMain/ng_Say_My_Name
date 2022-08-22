import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FavoriteComponent } from "./favorite.component";
import { I18NextModule } from "angular-i18next";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FavoriteRoutesModule } from "./favorite.routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";

@NgModule({
	imports: [
		CommonModule,
		I18NextModule,
		FormsModule,
		FavoriteRoutesModule,
		MatFormFieldModule,
		MatSelectModule,
		ReactiveFormsModule,
		MatListModule
	],
	declarations: [FavoriteComponent],
})
export class FavoriteModule {}
