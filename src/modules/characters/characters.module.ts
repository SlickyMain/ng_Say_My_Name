import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { SingleCharacterComponent } from "./components/singleCharacter/singleCharacter.component";
import { CharactersComponent } from "./characters.component";
import { CharactersFilterPipePipe } from "src/pipes/charactersFilterPipe.pipe";
import { CharacterDetailsComponent } from "./pages/characterDetails/characterDetails.component";
import { I18NextModule } from "angular-i18next";
import { NgxPaginationModule } from "ngx-pagination";
import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import { CharactersRoutesModule } from "./characters.routing.module";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";

registerLocaleData(localeRu);

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		I18NextModule,
		NgxPaginationModule,
		CharactersRoutesModule,
		MatChipsModule,
		MatFormFieldModule,
		MatIconModule
	],
	declarations: [
		CharactersFilterPipePipe,
		CharactersComponent,
		SingleCharacterComponent,
		CharacterDetailsComponent,
	],
})
export class CharactersModule {}
