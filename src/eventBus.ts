import { EventEmitter } from "events";
import { IEventBus, Listener } from "./type";

// task 2.1: Design and implement an EventBus that allows services to communicate with each other;
export class EventBus extends EventEmitter implements IEventBus {
  eventListeners: Map<string, Listener>;

  constructor() {
    super();
    this.eventListeners = new Map();
  }

  // task 2.2: Class must provide a method to publish events;
  // Returns true if the event had listeners, false otherwise
  publish(event: string, data: any) {
    return this.emit(event, data);
  }

  // task 2.3: Class must provide a method to listen (subscribe) to events;
  // return false if event already existed else return true
  subscribe(name: string, listener: Listener) {
    if (this.isEventExists(name)) {
      return false;
    }

    this.eventListeners.set(name, listener);
    this.on(name, listener);
    return true;
  }

  // task 2.4: Class also provides a method to unsubscribe to events;
  unsubscribe(name: string) {
    const listener = this.eventListeners.get(name);
    if (!listener) {
      return false;
    }
    this.removeListener(name, listener);
    return true;
  }

  private isEventExists(name: string) {
    return this.eventListeners.has(name);
  }
}
