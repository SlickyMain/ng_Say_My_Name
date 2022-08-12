import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharactersComponent } from "src/modules/characters/characters.component";
import { MonkeNotFoundComponent } from "src/modules/characters/pages/monkeNotFound/monkeNotFound.component";
import { CharacterDetailsComponent } from "src/modules/characters/pages/characterDetails/characterDetails.component";

const routes: Routes = [
	{ path: "", component: CharactersComponent },
	{ path: "person/:id", component: CharacterDetailsComponent },
	{ path: "**", component: MonkeNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
