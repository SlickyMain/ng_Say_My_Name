import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CharactersComponent } from "./characters.component";
import { CharacterDetailsComponent } from "./pages/characterDetails/characterDetails.component";

const routes: Routes = [
	{
		path: "",
		component: CharactersComponent,
	},
	{
		path: "person/:id",
		component: CharacterDetailsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CharactersRoutesModule {}
