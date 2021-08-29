/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:38 PM -- October 05th, 2019.
 *	Project: stream
 */

import { Stream } from "./stream";

/**
 * An interface representing a type that can be constructed from a stream.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export type Collectable<T, E> = {

	new(stream: Stream<E>): T;

} | {

	fromStream(stream: Stream<E>): T;

};
