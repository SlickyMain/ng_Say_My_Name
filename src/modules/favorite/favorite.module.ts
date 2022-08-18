import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { I18NextModule } from "angular-i18next";
import { FormsModule } from "@angular/forms";
import { FavoriteRoutesModule } from "./favorite.routing.module";

@NgModule({
	imports: [
		CommonModule,
		I18NextModule,
		FormsModule,
		FavoriteRoutesModule
	],
	declarations: [FavoriteComponent]
})
export class FavoriteModule { }
