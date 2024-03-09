/**
 * 消息组件插件
 */
import { find, Node } from 'cc';
let Alert:AlerrNode = null ;
// 消息节点
class AlerrNode extends Node {
    //消息文字渲染方法
    public rander(msg: string,time: number,...args){

    }
}
/**
 * 加载插件
 */
export function run(alert:AlerrNode = null){
    if(alert == null){
        alert = createAlert()
    }
    Alert = alert
    //读取到Canvas节点并在节点上添加Alert组件
    find('Canvas').addChild(alert);
}

/**
 * 展示消息
 * @param msg 展示的信息
 * @param time 展示时间 单位 秒
 */
export function AlertMsg(msg: string,time: number){
    Alert.rander(msg,time)
}
/**
 * 创建Alert节点
 */
function createAlert():AlerrNode{
    return new AlerrNode();
}
/**
 * 创建
 */

function test(){
    let MsgNode = new Node('AletQinSan');
    let Main = find('Canvas');
    Main.addChild(MsgNode)
}
