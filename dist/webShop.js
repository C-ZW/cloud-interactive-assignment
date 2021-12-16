"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebShop = void 0;
// task 3.1: Design and implement a WebShop service/class that allows a user to buy tokens or a subscription;
class WebShop {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.products = new Map();
    }
    // task 3.4: The Webshop Class must provide a method to buy a product using buyProduct(userId, productType, productId);
    buyProduct(userId, productType, productId) {
        const product = this.products.get(productId);
        if (!product) {
            return false;
        }
        // task 3.5: When the user has bought a product there needs to be an event published on the EventBus;
        this.eventBus.publish(productType, { userId, ...product });
        return true;
    }
    getProduct(productId) {
        return this.products.get(productId);
    }
    addProduct(product) {
        this.products.set(product.productId, product);
    }
}
exports.WebShop = WebShop;
//# sourceMappingURL=webShop.js.map