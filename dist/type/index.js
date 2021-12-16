"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyTokenInfo = exports.Subscription = exports.Token = exports.Product = exports.ProductType = exports.TransferType = void 0;
var TransferType;
(function (TransferType) {
    TransferType["transfer"] = "transfer";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
var ProductType;
(function (ProductType) {
    ProductType["token"] = "token";
    ProductType["subscription"] = "subscription";
})(ProductType = exports.ProductType || (exports.ProductType = {}));
// task 3.2: Add a Product class that contains a productType and productId field;
class Product {
    constructor(productType, productId) {
        this.productId = productId;
        this.productType = productType;
    }
}
exports.Product = Product;
// task 3.3: Add a Token and Subscription class;
class Token extends Product {
    constructor(productId, amount) {
        super(ProductType.token, productId);
        this.amount = amount;
    }
}
exports.Token = Token;
// task 3.3: Add a Token and Subscription class;
class Subscription extends Product {
    constructor(productId) {
        super(ProductType.subscription, productId);
    }
}
exports.Subscription = Subscription;
class BuyTokenInfo extends Token {
    constructor(userId, amount, productId) {
        super(amount, productId);
        this.userId = userId;
    }
}
exports.BuyTokenInfo = BuyTokenInfo;
//# sourceMappingURL=index.js.map