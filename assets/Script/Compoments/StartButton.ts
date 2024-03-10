//Login场景中的登录按键
import { _decorator, Component, director, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('StartButton')
export class StartButton extends Component {
    @property(Node) ProgressNode: Node;
    Login(){
        /**隐藏按钮显示进度条 */
        this.node.active = false;
        /**显示进度条 */
        this.ProgressNode.active = true;
    }
}


