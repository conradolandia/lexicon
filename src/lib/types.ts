export type Abbreviation = {
	id: number;
	page_id: number;
	characters: string | null;
	transcription: string | null;
	category: string | null;
	period: string | null;
	language: string | null;
	position1: 0 | 1;
	position2: 0 | 1;
	position3: 0 | 1;
	position4: 0 | 1;
	position5: 0 | 1;
	position6: 0 | 1;
	position7: 0 | 1;
	position8: 0 | 1;
	position9: 0 | 1;
	x: number;
	y: number;
	width: number;
	height: number;
	unsure: 0 | 1;
};

export type PositionIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function positionValue(
	abbr: Abbreviation,
	index: PositionIndex
): 0 | 1 {
	switch (index) {
		case 1:
			return abbr.position1;
		case 2:
			return abbr.position2;
		case 3:
			return abbr.position3;
		case 4:
			return abbr.position4;
		case 5:
			return abbr.position5;
		case 6:
			return abbr.position6;
		case 7:
			return abbr.position7;
		case 8:
			return abbr.position8;
		case 9:
			return abbr.position9;
	}
}
