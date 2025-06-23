import { makeAutoObservable } from 'mobx';

class BeerStore {
  // State
  isOldEnough = false;
  confirmedAge = false;
  afterKev = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  setTooYoung() {
    this.isOldEnough = false;
    this.confirmedAge = true;
  }

  setOldEnough() {
    this.isOldEnough = true;
    this.confirmedAge = true;
  }

  setAfterKev() {
    this.isOldEnough = true;
    this.confirmedAge = true;
    this.afterKev = true;
  }

  // Computed values
  get mightBeUnder18() {
    return !this.isOldEnough;
  }
}

// Create and export a singleton instance
const beerStore = new BeerStore();
export default beerStore;
