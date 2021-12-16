// task 1.1: Design and implement a service (class) that is responsible for keeping track of account

import { User } from "./models/userModel";
import { IEventBus, RetriveStorage, TransferType } from "./type";

// balances and contains methods to transfer tokens;
export class TokenService {
  userStorage: RetriveStorage<number, User>;
  userLock: Set<number>;
  userBalance: Map<number, number>; // (id, balance)
  eventBus: IEventBus;

  constructor(userStore: RetriveStorage<number, User>, eventBus: IEventBus) {
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
  transfer(sourceId: number, targetId: number, credit: number) {
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

    const sourceAmout = this.userBalance.get(sourceId)!;
    const targetAmount = this.userBalance.get(targetId)!;
    // transfer credit not enough
    if (sourceAmout < credit) {
      return false;
    }

    this.userBalance.set(sourceId, sourceAmout - credit);
    this.userBalance.set(targetId, targetAmount + credit);

    this.unlockUser(sourceId);
    this.unlockUser(targetId);
    this.eventBus.publish(TransferType.transfer, {
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
  retrieveBalance(id: number) {
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
  systemTransfer(id: number, credit: number) {
    const user = this.userStorage.retrive(id);
    if (user === undefined) {
      return false;
    }
    const lock = this.lockUser(id);
    if (!lock) {
      return false;
    }
    const currentBalance = this.userBalance.get(id)!;
    this.userBalance.set(id, currentBalance + credit);
    this.unlockUser(id);
    return true;
  }

  // return true if get the user lock, else return false
  private lockUser(id: number) {
    if (this.userLock.has(id)) {
      return false;
    }
    this.userLock.add(id);
    return true;
  }

  // return false if already unlock else return true
  private unlockUser(id: number) {
    return this.userLock.delete(id);
  }
}
