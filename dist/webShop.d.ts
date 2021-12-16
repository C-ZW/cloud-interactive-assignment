import { IEventBus, Product } from "./type";
export declare class WebShop {
    eventBus: IEventBus;
    products: Map<number, Product>;
    constructor(eventBus: IEventBus);
    buyProduct(userId: number, productType: string, productId: number): boolean;
    getProduct(productId: number): Product | undefined;
    addProduct(product: Product): void;
}
