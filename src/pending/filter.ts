import { Contract, IContract } from '../models/contracts/contract';

export class Cart {
  public contracts: IContract[] = [];
  constructor() {
    this.load();
  }

  public load() {
  }

  public refresh() {
    var cart = this;
    return () => {
      cart.load();
    }
  }
}