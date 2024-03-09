/**
 * 消息组件插件
 */
import { assetManager, Color, find, ImageAsset, Label, LabelComponent, Node, Sprite, SpriteFrame, Texture2D } from 'cc';
/**
 * 加载插件
 */
export function run(alert:Node = null){
    if(alert == null){
        alert = createAlert()
    }
    // alert.active = false;
    //读取到Canvas节点并在节点上添加Alert组件
    find('Canvas').addChild(alert);
}

/**
 * 展示消息
 * @param msg 展示的信息
 * @param time 展示时间 单位 秒
 */
// export function AlertMsg(msg: string,time: number){
//     Alert.rander(msg,time)
// }
/**
 * 创建Alert节点
 */
function createAlert():Node{
    /**
     * 创建消息根节点
     * 添加背景图片
     * 添加文字节点
     */
    const AlertRoot:Node = new Node();
    AddSprite(AlertRoot)
    AddLabel(AlertRoot)
    return AlertRoot;
}
/**
 * 给传入节点添加Srite
 * @param node  需要添加精灵组件的节点
 */
function AddSprite(node:Node){
    let remoteUrl = "https://api.miaowuchuxing.com/2048/img/Background.png";
    assetManager.loadRemote<ImageAsset>(remoteUrl, function (err, imageAsset) {
        const spriteFrame = new SpriteFrame();
        const texture = new Texture2D();
        texture.image = imageAsset;
        spriteFrame.texture = texture;
        node.addComponent(Sprite).spriteFrame = spriteFrame;
    });
}
function AddLabel(node:Node){
    let labelNode = new Node()
    let label = labelNode.addComponent(Label)
    label.string = '我是测试消息'
    node.addChild(labelNode)
}

