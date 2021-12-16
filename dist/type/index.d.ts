export declare enum TransferType {
    "transfer" = "transfer"
}
export interface IEventBus {
    publish(event: string, data: any): boolean;
    subscribe(name: string, listener: Listener): boolean;
    unsubscribe(name: string): boolean;
}
export declare type Listener = (...args: any[]) => void;
export declare enum ProductType {
    "token" = "token",
    "subscription" = "subscription"
}
export declare abstract class Product {
    productType: string;
    productId: number;
    constructor(productType: string, productId: number);
}
export declare class Token extends Product {
    amount: number;
    constructor(productId: number, amount: number);
}
export declare class Subscription extends Product {
    constructor(productId: number);
}
export declare class BuyTokenInfo extends Token {
    userId: number;
    constructor(userId: number, amount: number, productId: number);
}
export interface BuyTokenInfo {
    userId: number;
    amount: number;
}
export interface BuySubscriptionInfo {
    userId: number;
}
export interface TransferInfo {
    sourceId: number;
    targetId: number;
    credit: number;
}
export interface RetriveStorage<K, T> {
    register(item: T): boolean;
    retrive(key: K): T | undefined;
    retriveAll(): T[];
}
