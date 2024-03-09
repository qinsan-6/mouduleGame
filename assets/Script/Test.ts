import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import {run} from './Until/Alert'
@ccclass('Test')
export class Test extends Component {
    start() {
        run()
    }

    update(deltaTime: number) {
        
    }
}


