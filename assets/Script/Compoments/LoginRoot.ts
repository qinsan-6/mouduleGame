import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoginRoot')
export class LoginRoot extends Component {
    start() {
        /**
         * 加载下一页面所需的远程图片资源
         */
        this.LoadImg();
        this.node.getChildByName('ProgressBar').active = false
    }
    /**加载远程图片资源 */
    LoadImg(){

    }

    update(deltaTime: number) {
        
    }
}


