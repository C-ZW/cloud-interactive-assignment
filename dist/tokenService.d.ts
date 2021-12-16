import { User } from "./models/userModel";
import { IEventBus, RetriveStorage } from "./type";
export declare class TokenService {
    userStorage: RetriveStorage<number, User>;
    userLock: Set<number>;
    userBalance: Map<number, number>;
    eventBus: IEventBus;
    constructor(userStore: RetriveStorage<number, User>, eventBus: IEventBus);
    /**
     * Task 1.2: Class must provide a method to transfer tokens to another account;
     *
     * @param source
     * @param target
     */
    transfer(sourceId: number, targetId: number, credit: number): boolean;
    /**
     * Task 1.3: Class must provide a method to retrieve the balance of a specific account;
     *
     * @param source
     * @param target
     */
    retrieveBalance(id: number): number | undefined;
    /**
     * Task 1.4: Class must provide a method to retrieve the total balance of all accounts;
     *
     * @param source
     * @param target
     */
    retrieveAllBalance(): number;
    systemTransfer(id: number, credit: number): boolean;
    private lockUser;
    private unlockUser;
}
