import { EventTarget, Node } from 'cc';
/**
 * 发送事件(默认发送全局事件)
 * @param name 事件名
 * @param param 事件参数
 * @param event 事件载体
 */
import eventBus from './EventBus'
export function sendEvent(name: string, param: any = null, event: EventTarget = eventBus.get_instance()) {
    console.log(event)
    event.emit(name, param)
}
/**
 * 监听事件(默认监听全局事件)
     * 给节点监听指定全局事件,并在监听到事件后调用callback
     * @param name 事件名称
     * @param callback  事件回调
     * @param node 监听事件的节点
     * @param event 事件对象
     */
export function listenEvent(name: string, callback: FunctionType, node: Node, event: EventTarget = eventBus.get_instance()) {
    console.log(event)
    event.on(name, callback, node);
}