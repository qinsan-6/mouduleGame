import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ProgressNode')
export class ProgressNode extends Component {
    /**
     *  渲染进度条 
     *  @param value 进度条覆盖增加百分值 100=100%
     */
    rander(value: number){
        const sprite = this.node.getChildByName('ProgressNode').getComponent(Sprite)
        if(sprite.fillRange == 1){
            return this.OverProgress()
        }
        sprite.fillRange += (value * 0.01)
    }
    /**
     * 进度条加载完毕执行方法
     */
    OverProgress(){
        
    }
}


