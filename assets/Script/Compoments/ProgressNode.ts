import { _decorator, Component, director, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import {Audio} from './Audio'
@ccclass('ProgressNode')
export class ProgressNode extends Component {
    @property(Node) AudioNode:Node
    /**
     *  渲染进度条 
     *  @param value 进度条覆盖增加百分值 100=100%
     */
    rander(value: number){
        const sprite = this.node.getChildByName('ProgressNode').getComponent(Sprite)
        sprite.fillRange += (value * 0.01)
        if(sprite.fillRange >= 1){
            return this.OverProgress()
        }
    }
    /**
     * 进度条加载完毕执行方法
     */
    OverProgress(){
        /**切换到游戏主场景 */
        director.loadScene('Game')
    }
    protected start(): void {
        const audio = this.AudioNode.getComponent(Audio)
        audio.loadImg();
        audio.loadVideo();
    }
}


