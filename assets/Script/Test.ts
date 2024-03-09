import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import GetColor from './Until/Color'
@ccclass('Test')
export class Test extends Component {
    start() {
        let color = new GetColor()
        console.log(color.LoopColor());
        console.log(color.LoopColor());
        console.log(color.LoopColor());
        console.log(color.LoopColor());
        console.log(color.LoopColor());
    }

    update(deltaTime: number) {
        
    }
}


