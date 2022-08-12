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
	birthday: {
		text: string;
		enabled: boolean;
	};
	occupation: {
		text: string;
		enabled: boolean;
	};
	status: {
		text: string;
		enabled: boolean;
	};
	nickname: {
		text: string;
		enabled: boolean;
	};
	portrayed: {
		text: string;
		enabled: boolean;
	};
	[key: string]: any
}
