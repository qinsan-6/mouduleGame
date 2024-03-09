//Login场景中的登录按键
import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('StartButton')
export class StartButton extends Component {
    @property(Node) ProgressNode: Node;
    Login(){
        /**隐藏按钮显示进度条 */
        this.node.active = false;
        this.ProgressNode.active = true;
        this.schedule(()=>{
            this.ProgressNode.getComponent(Sprite).fillRange += 0.1
        },1)
    }
}


