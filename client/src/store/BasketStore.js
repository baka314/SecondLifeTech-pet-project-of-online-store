import { makeAutoObservable } from "mobx";

class BasketStore {
    basket = [];
    comment = ""; // Add comment property

    constructor() {
        makeAutoObservable(this);
    }

    addToBasket(device) {
        this.basket.push(device);
    }

    removeFromBasket(deviceId) {
        this.basket = this.basket.filter((item) => item.id !== deviceId);
    }
    get totalPriceHrivna() {
        return this.basket.reduce((total, item) => (total + item.price), 0);
    }
    get totalPrice() {
        return this.basket.reduce((total, item) => (total + item.price)/40, 0);
    }

    get totalItems() {
        return this.basket.length;
    }

    setComment(comment) {
        this.comment = comment;
    }

    clearBasket() {
        this.basket = [];
        this.comment = "";
    }
}

export default new BasketStore();
