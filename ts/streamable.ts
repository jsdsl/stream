/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:31 AM -- October 07th, 2019.
 *	Project: JSDSL - Stream
 */

import { Iterable } from "@jsdsl/iterator";
import { Stream } from "./stream";

/**
 * An interface representing some type that can produce a {@link Stream} of elements.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface Streamable<E> extends Iterable<E> {
	
	/**
	 * Returns a {@link Stream} over some collection of elements.
	 * 
	 * @return A {@link Stream} over some collection of elements.
	 */
	stream(): Stream<E>;
	
}