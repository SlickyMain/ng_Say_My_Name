export interface ICharacter {
	[key: string]: any;
	char_id: number;
	name: string;
	birthday: string;
	occupation: string[];
	img: string;
	status: string;
	appearance: number[];
	nickname: string;
	portrayed: string;
}

export interface IFilter {
	birthday: boolean;
	occupation: boolean;
	status: boolean;
	nickname: boolean;
	portrayed: boolean;
	[key: string]: any;
}
