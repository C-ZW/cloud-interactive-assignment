import { IEventBus, Product } from "./type";

// task 3.1: Design and implement a WebShop service/class that allows a user to buy tokens or a subscription;
export class WebShop {
  eventBus: IEventBus;
  products: Map<number, Product>; // (type, product)

  constructor(eventBus: IEventBus) {
    this.eventBus = eventBus;
    this.products = new Map();
  }

  // task 3.4: The Webshop Class must provide a method to buy a product using buyProduct(userId, productType, productId);
  buyProduct(userId: number, productType: string, productId: number) {
    const product = this.products.get(productId);
    if (!product) {
      return false;
    }

    // task 3.5: When the user has bought a product there needs to be an event published on the EventBus;
    this.eventBus.publish(productType, { userId, ...product });
    return true;
  }

  getProduct(productId: number) {
    return this.products.get(productId);
  }

  addProduct(product: Product) {
    this.products.set(product.productId, product);
  }
}
