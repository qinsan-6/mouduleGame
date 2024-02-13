/**
 * 全局事件总线
 */
import { _decorator, EventTarget } from 'cc';
export default class EventBus extends EventTarget{
    //单例
    private static instance: EventBus;
    static get_instance(): EventBus {
        if (EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
}
