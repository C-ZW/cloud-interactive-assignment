"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
const events_1 = require("events");
// task 2.1: Design and implement an EventBus that allows services to communicate with each other;
class EventBus extends events_1.EventEmitter {
    constructor() {
        super();
        this.eventListeners = new Map();
    }
    // task 2.2: Class must provide a method to publish events;
    // Returns true if the event had listeners, false otherwise
    publish(event, data) {
        return this.emit(event, data);
    }
    // task 2.3: Class must provide a method to listen (subscribe) to events;
    // return false if event already existed else return true
    subscribe(name, listener) {
        if (this.isEventExists(name)) {
            return false;
        }
        this.eventListeners.set(name, listener);
        this.on(name, listener);
        return true;
    }
    // task 2.4: Class also provides a method to unsubscribe to events;
    unsubscribe(name) {
        const listener = this.eventListeners.get(name);
        if (!listener) {
            return false;
        }
        this.removeListener(name, listener);
        return true;
    }
    isEventExists(name) {
        return this.eventListeners.has(name);
    }
}
exports.EventBus = EventBus;
//# sourceMappingURL=eventBus.js.map