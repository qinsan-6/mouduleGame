/**
 * 全局常用类声明
 */
export class PosSelf {
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    x: number;
    y: number;
}
export class MoveMsg {
    constructor() {
        this.move = {
            start: new Array<PosSelf>,
            end: new Array<PosSelf>,
        }
        this.merge = {
            start: new Array<PosSelf>,
            end: new Array<PosSelf>,
            value: new Array<number>
        }
    }
    moved: boolean = false;
    merged: boolean = false;
    move: {
        start: Array<PosSelf>;
        end: Array<PosSelf>;
    };
    merge: {
        start: Array<PosSelf>;
        end: Array<PosSelf>;
        value: Array<number>;
    }
    setmove(start: PosSelf, end: PosSelf) {
        this.moved = true;
        this.move.start.push(JSON.parse(JSON.stringify(start)));
        this.move.end.push(JSON.parse(JSON.stringify(end)));
    };
    setmerge(start: PosSelf, end: PosSelf, value: number) {
        this.merged = true;
        this.merge.start.push(JSON.parse(JSON.stringify(start)));
        this.merge.end.push(JSON.parse(JSON.stringify(end)));
        this.merge.value.push(JSON.parse(JSON.stringify(value)));
    }
}