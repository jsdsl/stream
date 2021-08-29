/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:53 PM -- June 11th, 2019.
 *	Project: @jsdsl/stream
 */


/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */

export { Stream } from "./stream";
export { Streamable } from "./streamable";
export { AbstractStreamable } from "./abstract-streamable";
export { Collectable } from "./collectable";
export { StreamBuilder } from "./stream-builder";

import { Stream } from "./stream";

class MyClass {

    public static fromStream(stream: string): MyClass {

        return undefined as any;

    }

}

let cls: MyClass = new MyClass(undefined as any);

let my_stream: Stream<any> = undefined as any;

let val: string = my_stream.collect(MyClass);
