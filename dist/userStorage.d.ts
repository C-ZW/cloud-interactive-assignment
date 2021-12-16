import { User } from "./models/userModel";
import { RetriveStorage } from "./type";
export declare class UserStorage implements RetriveStorage<number, User> {
    users: Map<number, User>;
    constructor();
    register(user: User): boolean;
    retrive(id: number): User | undefined;
    retriveAll(): User[];
}
