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
console.log("Initial user1 and user2");
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

console.log(
  "Initial three token products(1, 2, 3), and one subscription product(4)\n"
);
const token1 = new Token(1, 100);
const token2 = new Token(2, 200);
const token3 = new Token(3, 300);
const subscription = new Subscription(4);

webShop.addProduct(token1);
webShop.addProduct(token2);
webShop.addProduct(token3);
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

webShop.buyProduct(user1.id, subscription.productType, subscription.productId);
console.log(
  `After use1 buy subscription, user1 hasSubscription: ${
    userStorage.retrive(user1.id)?.hasSubscription
  }`
);
console.log(
  `After use1 buy subscription, user2 hasSubscription: ${
    userStorage.retrive(user2.id)?.hasSubscription
  }`
);

function transferCallback(data: TransferInfo) {
  console.log(
    `user${data.sourceId} transfer ${data.credit} to user${data.targetId}\n`
  );
}

function buyTokenCallback(data: BuyTokenInfo) {
  // Task 3.6 When the user buys tokens the tokens needs to be transferred to their account using the Token service;
  tokenService.systemTransfer(data.userId, data.amount);
  console.log(
    `User${data.userId} buy a ${ProductType.token}, productId: ${data.productId}`
  );
}

// Task 3.7 When the user buys a subscription the hasSubscription field must be set true;
function buySubscribeCallback(data: BuySubscriptionInfo) {
  const user = userStorage.retrive(data.userId);
  // ensure user exists
  if (user !== undefined) {
    user.hasSubscription = true;
  }
  console.log(
    `User: ${data.userId} buy a ${ProductType.subscription}, productId: ${data.productId}`
  );
}

// Task 3.8: Design the Webshop class in such a way that it can easily be extended with different product
// types without having to modify the Webshop class (Open/Closed Design Pattern).

// use dependency injection.
// predefined the webShopEventBus callbacks(buyTokenCallback, buySubscribeCallback) and productType then injection to webShop
