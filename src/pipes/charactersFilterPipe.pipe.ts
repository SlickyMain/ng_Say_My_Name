import { Pipe, PipeTransform } from "@angular/core";
import { ICharacter } from "src/models/character";

@Pipe({
	name: "charactersFilterPipe",
})
export class CharactersFilterPipePipe implements PipeTransform {
	transform(characters: ICharacter[], name: string): ICharacter[] {
		return characters.filter(char =>
			char.name.toLowerCase().includes(name.toLowerCase()),
		);
	}
}
