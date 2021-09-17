/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:17 PM -- October 05th, 2019.
 *	Project: @jsdsl/stream
 */


import { AbstractIterator } from "@jsdsl/iterator";
import { Collectable } from "./collectable";
import { StreamBuilder } from "./stream-builder";

/**
 * A series of consumable elements that can be filtered, mapped, reduced, etc. into other streams, or collected into
 * various other data structures.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class Stream<E> extends AbstractIterator<E> {
	
	protected iterable: Iterable<E>;
	
	/**
	 * Initializes a new Stream with the provided {@link Iterable}
	 * @param {Iterable<E>} iterable
	 */
	public constructor(iterable: Iterable<E>) {

		super();
		
		this.iterable = iterable;

	}
	
	public static of<E>(...elements: E[]): Stream<E> {
		
		return new Stream<E>(elements);
		
	}

	// DOC-ME [10/11/19 @ 1:08 PM] - Documentation required!
	public hasNext(): boolean {

		// TODO [10/6/19 @ 3:57 PM] - Finish the 'hasNext' method.
		return false;

	}

	// DOC-ME [10/11/19 @ 1:08 PM] - Documentation required!
	public next(): E | undefined {

		// TODO [10/6/19 @ 3:56 PM] - Finish the 'next' method.
		return undefined;

	}

	// DOC-ME [10/11/19 @ 1:08 PM] - Documentation required!
	public forEach(callback: (element: E) => any): void {

		for (let element of this) callback(element);

	}

	// DOC-ME [10/11/19 @ 1:08 PM] - Documentation required!
	public tee(): Stream<E> {

		// TODO [10/5/19 @ 9:25 PM] - Finish the 'tee' method.
		return new Stream<E>(this);

	}

	/**
	 * Returns a stream containing the elements of this stream for which the provided function returns true when
	 * provided with an element from this stream.
	 *
	 * Colloquially, this method returns a stream containing the elements of this stream that pass the provided filter.
	 *
	 * This function is stable.
	 *
	 * @param condition A function that, when provided with an element of this stream, returns true if the given element
	 * should be included in the output stream.
	 * @return A stream containing the elements of this stream for which the provided function returns true when
	 * provided with an element from this stream.
	 */
	public filter(condition: (element: E) => boolean): Stream<E> {

		let builder: StreamBuilder<E> = new StreamBuilder<E>();

		for (let element of this) if (condition(element)) builder.append(element);

		return builder.build();

	}

	/**
	 * Returns a stream whose elements have been mapped from elements of this stream into the output stream.
	 *
	 * In other words, if this stream contains a collection, c1, of elements, then this method will construct a new
	 * collection, c2, of elements, containing each of the elements of c1 with some function, f, applied to each element
	 * before it is added to c2: c2 = f(...c1).
	 *
	 * This function is stable.
	 *
	 * @param mapper The function, f (as mentioned above), to be applied to each element, e, of this stream before the
	 * given mapped element is added to the output stream, c2 (i.e. `c2.append(f(e))`).
	 * @return A stream whose elements have been mapped from elements of this stream into the output stream.
	 */
	public map<U>(mapper: (element: E) => U): Stream<U> {

		let builder: StreamBuilder<U> = new StreamBuilder<U>();

		for (let element of this) builder.append(mapper(element));

		return builder.build();

	}

	/**
	 * Returns true if ANY element of this Stream satisfies the given condition.
	 *
	 * @param condition The condition on which to check each of the elements of the stream.
	 * @return true if any element of this Stream satisfies the given condition.
	 */
	public hasAny(condition: (element: E) => boolean): boolean {

		for (let element of this) if (condition(element)) return true;

		return false;

	}

	/**
	 * Returns true if ALL of the elements of this Stream satisfy the given condition.
	 *
	 * @param condition The condition on which to check each of the elements of the stream.
	 * @return true if ALL of the elements of this Stream satisfy the given condition.
	 */
	public hasAll(condition: (element: E) => boolean): boolean {

		for (let element of this) if (!condition(element)) return false;

		return true;

	}

	/**
	 * Returns true if NONE of the elements of this Stream satisfy the given condition.
	 *
	 * This is the negation of Stream#hasAny.
	 *
	 * @param {(element: E) => boolean} condition The condition on which to check each of the elements of the stream.
	 * @return {boolean} true if NONE of the elements of this Stream satisfy the given condition.
	 */
	public hasNone(condition: (element: E) => boolean): boolean {

		return !this.hasAny(condition);

	}

	/**
	 * Returns a single value accumulated/calculated from an iteration over all of the elements in the Stream.
	 *
	 * Take for example the following pseudocode:
	 *
	 *   result <- baseValue
	 *   for element of stream:
	 *     result <- reducer(result, element)
	 *   return result
	 *
	 *
	 * @param baseValue The initial value of the accumulator variable that is passed to the reducer function.
	 * @param {} reducer A function that is called for each elements of the Stream.
	 * @return {U} A single value accumulated/calculated from an iteration over all of the elements in the Stream.
	 */
	public reduce<U>(reducer: (accumulator: U, element: E, index: number, done: (() => void)) => U, baseValue?: U): U | (U extends undefined ? undefined : U) {

		let iterator: Iterator<E> = this.iterable[Symbol.iterator]();
		let accumulation: U = baseValue ?? iterator.next().value;
		let isDone: boolean = false;

		function done(): void {
			isDone = true;
		}

		for (let element of iterator) {

			accumulation = reducer(accumulation, element, done);

			if (isDone) break;

		}

		return accumulation as U;

	}

	public collect<T>(collectable: Collectable<T, E>): T {

		if ((collectable as any)?.fromStream !== undefined) return (collectable as any).fromStream(this);
		else return new (collectable as any)(this);

	}

	/**
	 * Returns true if and only if this Stream contains all of the elements provided as arguments.
	 *
	 * @param elements The elements to check this container for.
	 * @return true if and only if this Stream contains all of the elements provided as arguments.
	 */
	public contains(...elements: E[]): boolean {

		return this.hasAny((element: E): boolean => elements.includes(element));

	}
	
	/**
	 * Returns a Stream containing all of the elements of this stream, but with the first `n` elements removed.
	 *
	 * @param {number} amount
	 * @returns {Stream<E>}
	 */
	public drop(amount: number): Stream<E> {
		
		// TODO [9/17/2021 @ 3:31 PM] Finish me!
		return undefined as any;
		
	}
	
	/**
	 *
	 * @param {number} amount
	 * @returns {Stream<E>}
	 */
	public take(amount: number): Stream<E> {
		
		// TODO [9/17/2021 @ 3:31 PM] Finish me!
		return undefined as any;
		
	}
	
	public head(amount: number): Stream<E> {
		
		// TODO [9/17/2021 @ 3:31 PM] Finish me!
		return undefined as any;
		
	}
	
	/**
	 * Returns a new Stream containing the last `n` elements of this Stream.
	 *
	 * @param {number} amount The number of elements that should be carried over from the end of this Stream.
	 * @returns {Stream<E>} A new Stream containing the last `n` elements of this Stream.
	 */
	public tail(amount: number): Stream<E> {
		
		// FIX-ME [9/17/2021 @ 4:56 PM] This function is not yet working :\
		
		let tailBuffer: E[] = [];
		let tailBufferIndex: number = -1;
		let elementCount: number = 0;
		
		for (let element of this) {
			
			elementCount++;
			tailBuffer[tailBufferIndex = (tailBufferIndex + 1) % amount] = element;
			
		}
		
		let tailElements: E[] = [];
		
		tailBufferIndex = ((tailBufferIndex - 1) + amount) % amount;
		
		for (let i: number = 0; i < amount; i++) tailElements[i] = tailBuffer[(tailBufferIndex + i) % amount];
		
		return (new StreamBuilder(...tailElements)).build();
		
	}
	
	/**
	 * Returns a new Stream containing all but the last `n` elements of this Stream.
	 *
	 * @param {number} amount The number of elements to exclude from the end of this Stream in the returned Stream.
	 * @returns {Stream<E>} A new Stream containing all but the last `n` elements of this Stream.
	 */
	public dropTail(amount: number): Stream<E> {
		
		// TODO [9/17/2021 @ 3:31 PM] Finish me!
		return undefined as any;
		
	}

	// distinct
	
	/**
	 * Returns the first element of this Stream, or undefined
	 *
	 * @returns {E | undefined}
	 */
	public first(): E | undefined {
		
		return this.head(1).toArray()[0];
		
	}
	
	public last(): E | undefined {
		
		return this.tail(1).toArray()[0];
		
	}

	/**
	 * Returns the number of elements contained in this Stream.
	 *
	 * @return The number of elements contained in this Stream.
	 */
	public size(): number {

		return this.reduce<number>(((accumulator: number): number => accumulator + 1));

	}

	/**
	 * Returns true if and only if this Stream holds no elements.
	 *
	 * @return true if and only if this Stream holds no elements.
	 */
	public isEmpty(): boolean {

		return this.hasNone((): boolean => true);

	}

	/**
	 * Returns an array representation of the elements contained in this Stream.
	 *
	 * @return An array representation of the elements contained in this Stream.
	 */
	public toArray(): E[] {

		let array: E[] = [];

		for (let element of this) array.push(element);

		return array;

	}

	/**
	 * Removes all of this Stream's elements, rendering it empty.
	 */
	public clear(): void {

		// TODO [10/5/19 @ 9:36 PM] - Finish the 'clear' method.

	}

}
