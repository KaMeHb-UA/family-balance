import EEAsyncIterator from 'event-emitter-async-iterator';

type EventEmitterAsyncIterator<T> = AsyncIterable<T> & EEAsyncIterator
declare const EventEmitterAsyncIterator: typeof EEAsyncIterator

export default EventEmitterAsyncIterator
