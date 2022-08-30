import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { SingleCharacterComponent } from "./components/singleCharacter/singleCharacter.component";
import { CharactersComponent } from "./characters.component";
import { CharactersFilterPipePipe } from "src/pipes/charactersFilterPipe.pipe";
import { CharacterDetailsComponent } from "./pages/characterDetails/characterDetails.component";
import { I18NextModule } from "angular-i18next";
import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import { CharactersRoutesModule } from "./characters.routing.module";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

registerLocaleData(localeRu);

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		I18NextModule,
		CharactersRoutesModule,
		MatChipsModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatExpansionModule,
		MatCheckboxModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
	],
	declarations: [
		CharactersFilterPipePipe,
		CharactersComponent,
		SingleCharacterComponent,
		CharacterDetailsComponent,
	],
})
export class CharactersModule {}
