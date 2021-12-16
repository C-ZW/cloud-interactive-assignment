"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStorage = void 0;
/**
 * UserStorage provide basic register and retrive user.
 */
class UserStorage {
    constructor() {
        this.users = new Map();
    }
    register(user) {
        // prevent duplicate register
        if (this.users.has(user.id)) {
            return false;
        }
        this.users.set(user.id, user);
        return true;
    }
    retrive(id) {
        return this.users.get(id);
    }
    retriveAll() {
        return [...this.users.values()];
    }
}
exports.UserStorage = UserStorage;
//# sourceMappingURL=userStorage.js.map