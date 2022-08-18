import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonkeNotFoundComponent } from "src/modules/characters/pages/monkeNotFound/monkeNotFound.component";

const routes: Routes = [
	{
		path: "",
		loadChildren: () =>
			import("../modules/characters/characters.module").then(
				m => m.CharactersModule,
			),
	},
	{
		path: "favorite",
		loadChildren: () =>
			import("../modules/favorite/favorite.module").then(
				m => m.FavoriteModule,
			),
	},
	{ path: "**", component: MonkeNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
