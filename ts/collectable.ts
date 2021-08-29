/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:38 PM -- October 05th, 2019.
 *	Project: stream
 */

import { IContainer } from "@jsdsl/container";
import { Stream } from "./stream";

/**
 * An interface representing a type that can be constructed from a stream.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface StreamConstructable<T extends IContainer<E>, E> {

	new(stream: Stream<E>): T;

}