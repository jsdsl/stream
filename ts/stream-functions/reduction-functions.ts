export type ReductionFunction<A, E, R> = (accumulator: A, element: E, done: (() => void) | undefined) => R;

export class ReductionFunctions {

	public static readonly SUM: ReductionFunction<number, number, number> =
		(accumulator: number, element: number): number => accumulator + element;
	
	public static readonly CONCAT: ReductionFunction<string, any, string> =
		(accumulator: string, element: any): string => accumulator + element;
	
	public static readonly PRODUCT: ReductionFunction<number, number, number> =
		(accumulator: number, element: number): number => accumulator * element;
	
	public static readonly MIN: ReductionFunction<number, number, number> =
		(accumulator: number, element: number): number => element < accumulator ? element : accumulator;
	
	public static readonly MAX: ReductionFunction<number, number, number> =
		(accumulator: number, element: number): number => element > accumulator ? element : accumulator;
	
	public static readonly COUNT: ReductionFunction<number, any, number> =
		(accumulator: number, element: number): number => accumulator + 1;
	
}
