/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:38 PM -- October 11th, 2019.
 *	Project: JSDSL - Stream
 */

import { Stream } from "./stream";
import { AbstractIterable, AbstractIterator, Iterator as JSDSLIterator } from "@jsdsl/iterator";

/**
 * A builder-pattern style factory for {@link Stream}s.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class StreamBuilder<E> extends AbstractIterable<E> {
	
	private elements: E[];
	
	private isBuilt: boolean;
	
	public constructor(...elements: E[]) {
		
		super();
		
		this.elements = elements;
		this.isBuilt = false;
		
	}
	
	public append(...elements: E[]) {
		
		if (!this.isBuilt) this.elements.push(...elements);
		else throw new Error("Cannot append to an already-built StreamBuilder.")
		
	}
	
	public iterator(): JSDSLIterator<E> {
		
		return new class extends AbstractIterator<E> {
			
			private readonly elements: E[];
			
			private cursor: number;
			
			public constructor(array: E[]) {
				
				super();
				
				this.elements = array;
				this.cursor = 0;
				
			}
			
			public hasNext(): boolean {
				
				return (this.cursor < this.elements.length);
				
			}
			
			public next(): E | undefined {
				
				return this.elements[this.cursor++];
				
			}
			
		}(this.elements);
		
	}
	
	public build(): Stream<E> {
		
		this.isBuilt = true;
		
		return new Stream<E>(this);
		
	}
	
}