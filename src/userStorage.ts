import { User } from "./models/userModel";
import { RetriveStorage } from "./type";

/**
 * UserStorage provide basic register and retrive user.
 */
export class UserStorage implements RetriveStorage<number, User> {
  users: Map<number, User>;

  constructor() {
    this.users = new Map();
  }

  register(user: User) {
    // prevent duplicate register
    if (this.users.has(user.id)) {
      return false;
    }
    this.users.set(user.id, user);
    return true;
  }

  retrive(id: number) {
    return this.users.get(id);
  }

  retriveAll() {
    return [...this.users.values()];
  }
}
