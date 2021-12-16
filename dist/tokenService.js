"use strict";
// task 1.1: Design and implement a service (class) that is responsible for keeping track of account
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const type_1 = require("./type");
// balances and contains methods to transfer tokens;
class TokenService {
    constructor(userStore, eventBus) {
        this.userStorage = userStore;
        this.eventBus = eventBus;
        this.userLock = new Set();
        this.userBalance = new Map();
        const users = this.userStorage.retriveAll();
        for (let user of users) {
            this.userBalance.set(user.id, 0);
        }
    }
    /**
     * Task 1.2: Class must provide a method to transfer tokens to another account;
     *
     * @param source
     * @param target
     */
    transfer(sourceId, targetId, credit) {
        const sourceUser = this.userStorage.retrive(sourceId);
        const targetUser = this.userStorage.retrive(targetId);
        // return false if one of users not in the storage
        if (!(sourceUser && targetUser)) {
            return false;
        }
        // always keep same sorting order to prevent deadlock
        const users = [sourceId, targetId].sort((a, b) => a - b);
        const sourceUserLock = this.lockUser(users[0]);
        const targetUserLock = this.lockUser(users[1]);
        // return false if one of users can't get the lock
        if (!(sourceUserLock && targetUserLock)) {
            return false;
        }
        const sourceAmout = this.userBalance.get(sourceId);
        const targetAmount = this.userBalance.get(targetId);
        // transfer credit not enough
        if (sourceAmout < credit) {
            return false;
        }
        this.userBalance.set(sourceId, sourceAmout - credit);
        this.userBalance.set(targetId, targetAmount + credit);
        this.unlockUser(sourceId);
        this.unlockUser(targetId);
        this.eventBus.publish(type_1.TransferType.transfer, {
            sourceId,
            targetId,
            credit,
        });
        return true;
    }
    /**
     * Task 1.3: Class must provide a method to retrieve the balance of a specific account;
     *
     * @param source
     * @param target
     */
    retrieveBalance(id) {
        return this.userBalance.get(id);
    }
    /**
     * Task 1.4: Class must provide a method to retrieve the total balance of all accounts;
     *
     * @param source
     * @param target
     */
    retrieveAllBalance() {
        let allBalance = 0;
        for (let balance of this.userBalance.values()) {
            allBalance += balance;
        }
        return allBalance;
    }
    // system transfer token to user (for task 3.6)
    systemTransfer(id, credit) {
        const user = this.userStorage.retrive(id);
        if (user === undefined) {
            return false;
        }
        const lock = this.lockUser(id);
        if (!lock) {
            return false;
        }
        const currentBalance = this.userBalance.get(id);
        this.userBalance.set(id, currentBalance + credit);
        this.unlockUser(id);
        return true;
    }
    // return true if get the user lock, else return false
    lockUser(id) {
        if (this.userLock.has(id)) {
            return false;
        }
        this.userLock.add(id);
        return true;
    }
    // return false if already unlock else return true
    unlockUser(id) {
        return this.userLock.delete(id);
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=tokenService.js.map