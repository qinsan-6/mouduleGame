/**
 * 取色器
 * 1.每次都随机取值
 * 2.循环取色
 * 3.每个值固定取一种颜色
 * 4.按照传入规则取值
 * 颜色默认为彩虹色
 */
export default class GetColor {
    constructor(color?: Array<string>) {
        if (color) {
            this.color = color
        }
    }
    private color: Array<string> = [
        "#FF0000 ",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#00FFFF",
        "#0000FF",
        "#8B00FF",
    ]//颜色组
    private colorMap: Map<number | string, string> //颜色对照表
    private RegularMap: Map<any, string> //固定颜色对照表
    private RegularIndex:number = 0 //固定取色器的循环指针
    private LoopIndex: number = 0 //循环取色指针
    /**
     * 随机取色
     */
    RandomColor() {
        let _this = this;
        return _this.color[random()]
        /**
         * 随机生成[0,this.color)
         */
        function random(): number {
            return Math.floor(_this.color.length * Math.random())
        }
    }
    /**
     * 依次循环取色
     */
    LoopColor() {
        if(this.LoopIndex == this.color.length){
            this.LoopIndex = 0
        } 
        return this.color[this.LoopIndex++];
    }
    /**
     * 固定值取固定颜色
     * 传入的相同的值会赋予相同的颜色
     */
    RegularColor(value: any): string {
        let color = this.RegularMap.get(value)
        if (color === null) {
            color = this.color[this.RegularIndex++]
            this.RegularMap.set(value, color)
            if(this.RegularIndex == this.color.length){
                this.RegularIndex = 0
            }
        }
        return color
    }
    /**
     * 按照传入规则取值
     * @param value 需要取色的值
     */
    LoopEqual(value: number | string, elur:Function): string {
        //读表
        let color = this.colorMap.get(value)
        if(color == null) {
            let index = elur(value)
            if(index >= this.color.length){
                return color
            }
            color = this.color[index]
            this.colorMap.set(value, color)
        }
        return color
    }
    /**
     * 拿到color中的第value个颜色下标
     * @param value 递归获取第value个颜色 value从0开始
     */
    recursion(value: number): number {
        let index = value
        if (this.color.length <= value) {
            index = this.recursion(value - this.color.length)
        }
        return index
    }
}
import { _decorator, Component, Node } from 'cc';




