import { _decorator, assetManager, AudioClip, AudioSource, Component, director, Node } from 'cc';
import { ProgressNode } from './ProgressNode';
const { ccclass, property } = _decorator;

@ccclass('Audio')
export class Audio extends Component {
    @property(Node) progressBar:Node
    start() {
        /**设置为常驻节点 */
        director.addPersistRootNode(this.node);
    }
    /**加载远程音频资源 */
    loadVideo(){
        let _this = this;
        const audioSource = this.getComponent<AudioSource>(AudioSource);
        const remoteUrl = "https://api.miaowuchuxing.com/2048/music/bgm.mp3";
        assetManager.loadRemote(remoteUrl, function (err, audioClip: AudioClip) {
            // play audio clip
            audioSource.clip = audioClip;
            audioSource.play();
            console.log(audioSource);
            _this.setProBar(50)
        });
        
    }
    /**加载远程图片资源 */
    loadImg(){
        this.scheduleOnce(function(){
            this.setProBar(50)
        },3);
    }
    //修改进度条状态
    setProBar(value:number){
        this.progressBar.getComponent(ProgressNode).rander(value);
    }
}


