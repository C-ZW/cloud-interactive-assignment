"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("./eventBus");
const userModel_1 = require("./models/userModel");
const tokenService_1 = require("./tokenService");
const type_1 = require("./type");
const userStorage_1 = require("./userStorage");
const webShop_1 = require("./webShop");
const userStorage = new userStorage_1.UserStorage();
console.log("Initial user1 and user2");
const user1 = new userModel_1.User(1, "user1", false);
const user2 = new userModel_1.User(2, "user2", false);
userStorage.register(user1);
userStorage.register(user2);
const tokenServiceEventBus = new eventBus_1.EventBus();
tokenServiceEventBus.subscribe(type_1.TransferType.transfer, transferCallback);
const tokenService = new tokenService_1.TokenService(userStorage, tokenServiceEventBus);
const webShopEventBus = new eventBus_1.EventBus();
webShopEventBus.subscribe(type_1.ProductType.token, buyTokenCallback);
webShopEventBus.subscribe(type_1.ProductType.subscription, buySubscribeCallback);
const webShop = new webShop_1.WebShop(webShopEventBus);
console.log("Initial three token products(1, 2, 3), and one subscription product(4)\n");
const token1 = new type_1.Token(1, 100);
const token2 = new type_1.Token(2, 200);
const token3 = new type_1.Token(3, 300);
const subscription = new type_1.Subscription(4);
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
console.log("after user1 transfer 1000 to user2 (user1 balance < 1000, nothing happen)");
console.log(`User1 balance: ${tokenService.retrieveBalance(user1.id)}`);
console.log(`User2 balance: ${tokenService.retrieveBalance(user2.id)}`);
console.log(`All balance: ${tokenService.retrieveAllBalance()}\n`);
webShop.buyProduct(user1.id, subscription.productType, subscription.productId);
console.log(`After use1 buy subscription, user1 hasSubscription: ${(_a = userStorage.retrive(user1.id)) === null || _a === void 0 ? void 0 : _a.hasSubscription}`);
console.log(`After use1 buy subscription, user2 hasSubscription: ${(_b = userStorage.retrive(user2.id)) === null || _b === void 0 ? void 0 : _b.hasSubscription}`);
function transferCallback(data) {
    console.log(`user${data.sourceId} transfer ${data.credit} to user${data.targetId}\n`);
}
function buyTokenCallback(data) {
    // Task 3.6 When the user buys tokens the tokens needs to be transferred to their account using the Token service;
    tokenService.systemTransfer(data.userId, data.amount);
    console.log(`User${data.userId} buy a ${type_1.ProductType.token}, productId: ${data.productId}`);
}
// Task 3.7 When the user buys a subscription the hasSubscription field must be set true;
function buySubscribeCallback(data) {
    const user = userStorage.retrive(data.userId);
    // ensure user exists
    if (user !== undefined) {
        user.hasSubscription = true;
    }
    console.log(`User${data.userId} buy a ${type_1.ProductType.subscription}, productId: ${data.productId}`);
}
// Task 3.8: Design the Webshop class in such a way that it can easily be extended with different product
// types without having to modify the Webshop class (Open/Closed Design Pattern).
// use dependency injection.
// predefined the webShopEventBus callbacks(buyTokenCallback, buySubscribeCallback) and productType then injection to webShop
//# sourceMappingURL=index.js.map