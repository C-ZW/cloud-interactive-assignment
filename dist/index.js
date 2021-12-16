"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("./eventBus");
const userModel_1 = require("./models/userModel");
const tokenService_1 = require("./tokenService");
const type_1 = require("./type");
const userStorage_1 = require("./userStorage");
const webShop_1 = require("./webShop");
const userStorage = new userStorage_1.UserStorage();
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
const token1 = new type_1.Token(1, 100);
const token2 = new type_1.Token(2, 200);
const token3 = new type_1.Token(3, 300);
webShop.addProduct(token1);
webShop.addProduct(token2);
webShop.addProduct(token3);
const subscription = new type_1.Subscription(4);
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
function transferCallback(data) {
    console.log(`user${data.sourceId} transfer ${data.credit} to user${data.targetId}\n`);
}
function buyTokenCallback(data) {
    tokenService.systemTransfer(data.userId, data.amount);
    console.log(`User${data.userId} buy a ${type_1.ProductType.token}, productId: ${data.productId}`);
}
function buySubscribeCallback(data) {
    const user = userStorage.retrive(data.userId);
    // ensure user exists
    if (user !== undefined) {
        user.hasSubscription = true;
    }
    console.log(`User: ${data.userId} buy a ${type_1.ProductType.subscription}, productId: ${data}`);
}
//# sourceMappingURL=index.js.map