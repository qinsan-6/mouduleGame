/**
 * 游戏主要逻辑流程控制文件 应用于游戏场景
 */
import { _decorator, Component, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Game')
export class Game extends Component {
    //游戏配置文件
    @property(JsonAsset)
    GameJson: JsonAsset = null!;
    //全局数据
    private game: GameType = [] //棋盘数据
    private GAMESIZE: number = 0//棋盘大小 
    private INITCOUNT: number = 0//初始棋盘上block的个数
    private Score = {
        score: 0,
        get(): number {
            return this.score
        },
        set(value: number) {
            this.score += value
            sendEvent('setScore', value)
        }
    }
    start() {
        /**
         * 文件流程:
         * 请求页面数据
         * 读取游戏配置文件
         * 初始化游戏底层数据
         * 加载页面数据
         * 页面展示
         */
        let _this = this;
        //获取到配置文件
        let gameJson: any = {}
        try {
            gameJson = this.GameJson.json!;
            _this.GAMESIZE = Number(gameJson["GAMESIZE"])
            _this.INITCOUNT = Number(gameJson["INITCOUNT"])
        } catch {
            return
        }
        this.gameInit(this.game);
        listenEvent('move', move, _this.node)
        listenEvent('blockInit', () => {
            for (let i = 0; i < _this.INITCOUNT; i++) {
                bianXinChongZuQi(_this.game)
            }
        }, _this.node)
        function move(param) {
            let movemsg = _this.gameMove(param)
            if (movemsg.moved) {
                sendEvent('moveAnimation', movemsg.move)
            }
            if (movemsg.merge) {
                sendEvent('mergeAnimation', movemsg.merge)
            }
            if (movemsg.moved || movemsg.merged) {
                bianXinChongZuQi(_this.game);
            }
        }
    }
    gameInit(game: GameType) {
        let _this = this
        for (let i = 0; i < _this.GAMESIZE; i++) {
            let tempArray = new Array<number>();
            ArrayInit(tempArray, _this.GAMESIZE)
            game.push(tempArray)
        }
    }
    gameMove(Dir: string): MoveMsg {
        let _this = this;
        let movemsg: MoveMsg = new MoveMsg()
        const Move = {
            up: {
                start: new PosSelf(0, 0),
                next(startpos: PosSelf): PosSelf {
                    let nextpos = new PosSelf(startpos.x + 1, startpos.y);
                    return nextpos
                },
                change() {
                    this.start.y = this.start.y + 1;
                    this.start.x = 0;
                }
            },
            down: {
                start: new PosSelf(_this.GAMESIZE - 1, 0),
                next(startpos: PosSelf): PosSelf {
                    let nextpos = new PosSelf(startpos.x - 1, startpos.y);
                    return nextpos
                },
                change() {
                    this.start.y = this.start.y + 1;
                    this.start.x = _this.GAMESIZE - 1;
                }
            },
            left: {
                start: new PosSelf(0, 0),
                next(startpos: PosSelf): PosSelf {
                    let nextpos = new PosSelf(startpos.x, startpos.y + 1);
                    return nextpos
                },
                change() {
                    this.start.x = this.start.x + 1;
                    this.start.y = 0;
                }
            },
            right: {
                start: new PosSelf(0, _this.GAMESIZE - 1),
                next(startpos: PosSelf): PosSelf {
                    let nextpos = new PosSelf(startpos.x, startpos.y - 1);
                    return nextpos
                },
                change() {
                    this.start.x = this.start.x + 1;
                    this.start.y = _this.GAMESIZE - 1;
                }
            }
        }
        for (let i = 0; i < _this.GAMESIZE; i++) {
            moveList(Dir)
            Move[Dir].change();
        }
        function moveList(dir: string) {
            let move = Move[dir]//获取移动对象
            let startpos: PosSelf = move.start//获取移动起始位置
            let nextpos: PosSelf = move.next(startpos)//获取移动下一位置
            for (let i = 0; i < _this.GAMESIZE - 1; i++) {
                let temppos = move.next(startpos)
                if (_this.game[nextpos.x][nextpos.y] != 0) {//下一位置不是零
                    if (_this.game[startpos.x][startpos.y] == 0) {//起始值为0
                        _this.game[startpos.x][startpos.y] = _this.game[nextpos.x][nextpos.y]
                        _this.game[nextpos.x][nextpos.y] = 0
                        movemsg.setmove(nextpos, startpos)
                    } else {
                        if (_this.game[startpos.x][startpos.y] == _this.game[nextpos.x][nextpos.y]) {
                            _this.game[startpos.x][startpos.y] *= 2
                            _this.game[nextpos.x][nextpos.y] = 0
                            _this.Score.set(_this.game[startpos.x][startpos.y])
                            movemsg.setmerge(nextpos, startpos, _this.game[startpos.x][startpos.y])
                        } else {
                            if (nextpos.x != temppos.x || nextpos.y != temppos.y) {
                                _this.game[temppos.x][temppos.y] = _this.game[nextpos.x][nextpos.y]
                                _this.game[nextpos.x][nextpos.y] = 0
                                movemsg.setmove(nextpos, temppos)
                            }
                        }
                        startpos = temppos
                    }
                }
                nextpos = move.next(nextpos)
            }
        }
        return movemsg
    }
}
/**
 * 导入发送事件方法
 */
import { listenEvent, sendEvent } from './Event/Index';
import { MoveMsg, PosSelf } from './ClassType';
import {bianXinChongZuQi,ArrayInit}from './Until/Math'

