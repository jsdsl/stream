/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:17 PM -- October 05th, 2019.
 *	Project: @jsdsl/stream
 */

import { IContainer } from "@jsdsl/container";
import { AbstractIterator, Iterable } from "@jsdsl/iterator";
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
export class Stream<E> extends AbstractIterator<E> implements IContainer<E> {

	// DOC-ME [10/11/19 @ 1:08 PM] - Documentation required!
	public constructor(iterable: Iterable<E>) {

		super();

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
	public reduce<U>(reducer: (accumulator: U, element: E, done: (() => void)) => U, baseValue?: U): U {

		let accumulation: U = baseValue ?? ;
		let isDone: boolean = false;

		function done(): void {
			isDone = true;
		}

		for (let element of this) {

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

		return this.hasAny((element: E));

	}

	// distinct
	// head
	// tail
	//

	/**
	 * Returns the number of elements contained in this Stream.
	 *
	 * @return The number of elements contained in this Stream.
	 */
	public size(): number {

		return this.reduce<number>(((accumulator: number) => accumulator + 1));

	}

	/**
	 * Returns true if and only if this Stream holds no elements.
	 *
	 * @return true if and only if this Stream holds no elements.
	 */
	public isEmpty(): boolean {

		return this.hasNone(() => true);

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
