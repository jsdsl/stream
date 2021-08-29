/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:33 AM -- October 07th, 2019.
 *	Project: JSDSL - Stream
 */

import { AbstractIterable } from "@jsdsl/iterator";
import { Streamable } from "./streamable";
import { Stream } from "./stream";

/**
 * An abstract implementation of the JSDSL {@link Stream} interface.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export abstract class AbstractStreamable<E> extends AbstractIterable<E> implements Streamable<E> {
	
	public stream(): Stream<E> {
		
		return new Stream<E>(this);
		
	}
	
}