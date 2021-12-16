/// <reference types="node" />
import { EventEmitter } from "events";
import { IEventBus, Listener } from "./type";
export declare class EventBus extends EventEmitter implements IEventBus {
    eventListeners: Map<string, Listener>;
    constructor();
    publish(event: string, data: any): boolean;
    subscribe(name: string, listener: Listener): boolean;
    unsubscribe(name: string): boolean;
    private isEventExists;
}
