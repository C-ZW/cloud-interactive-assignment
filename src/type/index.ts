export enum TransferType {
  "transfer" = "transfer",
}

export interface IEventBus {
  publish(event: string, data: any): boolean;
  subscribe(name: string, listener: Listener): boolean;
  unsubscribe(name: string): boolean;
}

export type Listener = (...args: any[]) => void;
export enum ProductType {
  "token" = "token",
  "subscription" = "subscription",
}

// task 3.2: Add a Product class that contains a productType and productId field;
export abstract class Product {
  productType: string;
  productId: number;

  constructor(productType: string, productId: number) {
    this.productId = productId;
    this.productType = productType;
  }
}

// task 3.3: Add a Token and Subscription class;
export class Token extends Product {
  amount: number;

  constructor(productId: number, amount: number) {
    super(ProductType.token, productId);
    this.amount = amount;
  }
}

// task 3.3: Add a Token and Subscription class;
export class Subscription extends Product {
  constructor(productId: number) {
    super(ProductType.subscription, productId);
  }
}

export class BuyTokenInfo extends Token {
  userId: number;

  constructor(userId: number, amount: number, productId: number) {
    super(amount, productId);
    this.userId = userId;
  }
}

export class BuySubscriptionInfo extends Subscription {
  userId: number;

  constructor(userId: number, productId: number) {
    super(productId);
    this.userId = userId;
  }
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
