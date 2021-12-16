import { EventBus } from "./eventBus";

import { User } from "./models/userModel";
import { TokenService } from "./tokenService";
import {
  BuySubscriptionInfo,
  BuyTokenInfo,
  IEventBus,
  ProductType,
  Subscription,
  Token,
  TransferInfo,
  TransferType,
} from "./type";
import { UserStorage } from "./userStorage";
import { WebShop } from "./webShop";

const userStorage = new UserStorage();
const user1 = new User(1, "user1", false);
const user2 = new User(2, "user2", false);
userStorage.register(user1);
userStorage.register(user2);

const tokenServiceEventBus: IEventBus = new EventBus();
tokenServiceEventBus.subscribe(TransferType.transfer, transferCallback);
const tokenService = new TokenService(userStorage, tokenServiceEventBus);

const webShopEventBus: IEventBus = new EventBus();
webShopEventBus.subscribe(ProductType.token, buyTokenCallback);
webShopEventBus.subscribe(ProductType.subscription, buySubscribeCallback);

const webShop = new WebShop(webShopEventBus);

const token1 = new Token(1, 100);
const token2 = new Token(2, 200);
const token3 = new Token(3, 300);

webShop.addProduct(token1);
webShop.addProduct(token2);
webShop.addProduct(token3);

const subscription = new Subscription(4);
webShop.addProduct(subscription);

webShop.buyProduct(user1.id, token1.productType, token1.productId);
webShop.buyProduct(user1.id, token2.productType, token2.productId);
console.log(`User1 balance: ${tokenService.retrieveBalance(user1.id)}`);
console.log(`All balance: ${tokenService.retrieveAllBalance()}\n`);

webShop.buyProduct(user2.id, token3.productType, token3.productId);
console.log(`User2 balance: ${tokenService.retrieveBalance(user2.id)}`);
console.log(`All balance: ${tokenService.retrieveAllBalance()}\n`);

tokenService.transfer(user1.id, user2.id, 100);
console.log("after user1 transfer 100 to user2");
console.log(`User1 balance: ${tokenService.retrieveBalance(user1.id)}`);
console.log(`User2 balance: ${tokenService.retrieveBalance(user2.id)}`);
console.log(`All balance: ${tokenService.retrieveAllBalance()}\n`);

tokenService.transfer(user1.id, user2.id, 1000);
console.log(
  "after user1 transfer 1000 to user2 (user1 balance < 1000, nothing happen)"
);
console.log(`User1 balance: ${tokenService.retrieveBalance(user1.id)}`);
console.log(`User2 balance: ${tokenService.retrieveBalance(user2.id)}`);
console.log(`All balance: ${tokenService.retrieveAllBalance()}\n`);

function transferCallback(data: TransferInfo) {
  console.log(
    `user${data.sourceId} transfer ${data.credit} to user${data.targetId}\n`
  );
}

function buyTokenCallback(data: BuyTokenInfo) {
  tokenService.systemTransfer(data.userId, data.amount);
  console.log(
    `User${data.userId} buy a ${ProductType.token}, productId: ${data.productId}`
  );
}

function buySubscribeCallback(data: BuySubscriptionInfo) {
  const user = userStorage.retrive(data.userId);
  // ensure user exists
  if (user !== undefined) {
    user.hasSubscription = true;
  }
  console.log(
    `User: ${data.userId} buy a ${ProductType.subscription}, productId: ${data}`
  );
}
