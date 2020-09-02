//此Databox中为一个闭环队列，长度随剩余游戏参与者的数量改变
class Databox {
    constructor() {
        this._data = [];
        this._Number = 0;
        this._curGamer = 0;
    }
    get data() {
        return this._data;
    }
    get Number() {
        return this._Number;
    }
    get curGamer() {
        return this._curGamer;
    }
    Init(Gamer) {
        this._Number = Gamer;
        for (var i = 0; i < Gamer; i++) {
            this._data.push(i);
        }
    }
    aGround(diceNumber) {
        var order = [];
        for (var i = 0; i < diceNumber; i++) {
            order.push((this._curGamer + i) % this._data.length);
        }
        this._curGamer = (this._curGamer + diceNumber) % this._data.length;
        this._data.splice(order[order.length - 1], 1);
        this._Number = this._data.length;
    }
}