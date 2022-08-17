import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { I18NextModule } from "angular-i18next";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		I18NextModule,
		RouterModule,
		FormsModule
	],
	declarations: [FavoriteComponent]
})
export class FavoriteModule { }
