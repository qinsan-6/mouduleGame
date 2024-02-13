/**
 * 数学类工具函数
 */

import { Vec2 } from "cc";
import { PosSelf } from "../ClassType";

/**
     * 随机生成2和4
     * @param probability  可选值0 - 1 生成2的概率 默认值为0.5
     */
export function randomTorF(probability: number = 0.5): number {
    return Math.random() > probability ? 4 : 2
}
/**
 * 随机生成指定范围内的整数 范围为:[start,end)
 * @param start 起始值
 * @param end   结束值
 */
export function randomRangeData(start: number, end: number) {
    return Math.floor(start + (end - start) * Math.random())
}
/**
 * 从传入位置信息组中随机选择位置
 * @param posArry 位置信息组
 */
export function randomPos(posArry: Array<PosSelf>): PosSelf {
    return posArry[this.randomRangeData(0, posArry.length)]
}
/**
 * 初始化传入的数组 
 * @param array 需要初始化的数组
 * @param lenth 需要初始化的长度
 * @param initdata 初始值 .默认为0
 */
export function ArrayInit(array: Array<number>, length: number, initdata: number = 0) {
    for (let i = 0; i < length; i++) {
        array.push(initdata);
    }
}
/**
 * 查询二维数组中那些位置是给定数据
 * @param game 二维数组
 * @param value 给定数据 默认为0
 */
export function findNullPos(game: GameType, value: number = 0): Array<PosSelf> {
    let pos = new Array<PosSelf>();
    let i = 0;
    let j = 0;
    game.forEach(temp => {
        temp.forEach(item => {
            if (item === value) {
                pos.push(new PosSelf(i, j))
            }
            j++;
        })
        j = 0;
        i++;
    })
    return pos;
}
/**
 * 判断出移动方向
 */
export function moveDir(start: Vec2, end: Vec2): 'up' | 'down' | 'left' | 'right' {
    let xDistance: number = end.x - start.x
    let yDistance: number = end.y - start.y
    if (Math.abs(xDistance) > Math.abs(yDistance)) {
        return xDistance > 0 ? 'right' : 'left';
    } else {
        return yDistance > 0 ? 'up' : 'down';
    }
}

/**
 * 将传入的二维数组中指定的数据中的某一个随机替换为2或4
 */
export function bianXinChongZuQi(game: GameType): void {
    let pos: PosSelf = this.randomPos(this.findNullPos(game));
    let value: number = this.randomTorF();
    this.emitEvent('createBlock', { pos: pos, value: value });
    game[pos.x][pos.y] = value
}
/**
 * 计算出两个数据间的差值是否小于10
 */
export function mistakeLessTen(a: number, b: number,accuracy:number = 10): boolean {
    return Math.abs(a - b) < accuracy ? true : false;
}
// /**
//  * 返回指定节点的指定位置的子节点
//  * @param fatherNode 父节点
//  * @param pos 子节点所在位置
//  */
// function findChirenNode(fatherNode: Node, pos: Vec3): Array<Node> {
//     let blocks = new Array<Node>
//     for (let block of fatherNode.children) {
//         let blockPos = block.getPosition()
//         if (this.mistakeLessTen(blockPos.x, pos.x) && this.mistakeLessTen(blockPos.y, pos.y)) {
//             blocks.push(block)
//         }
//     }
//     return blocks
// }