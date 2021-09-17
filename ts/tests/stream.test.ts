/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:19 PM -- September 17th, 2021
 * Project: stream
 */

import { Stream } from "../stream";

const RANGE: number[][] = [
	[],
	[1],
	[1, 2],
	[1, 2, 3],
	[1, 2, 3, 4],
	[1, 2, 3, 4, 5]
];

let stream: Stream<number> = new Stream<number>(1, 2, 3);

Stream.of(1, 2, 3);

describe("Per-method tests.", (): void => {



});
