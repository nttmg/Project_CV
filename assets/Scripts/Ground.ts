import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    @property({
        type: Node,
        tooltip: 'First Ground'
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: 'Second Ground'
    })
    public ground2: Node;

    public groundWidth1: number;
    public groundWidth2: number;

    public tempStartLocation1 = new Vec3;   
    public tempStartLocation2 = new Vec3;

    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number;


    onLoad() {
        this.startUp();
    }
    startUp() {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = 1280;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
    }

    update(deltaTime: number) {
        this.gameSpeed = this.gameCtrlSpeed.speed;

        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;

        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        const canvasWidth = canvas.getComponent(UITransform).width

        if(this.tempStartLocation1.x <= -canvasWidth) {
            this.tempStartLocation1.x = canvasWidth;
        }

        if(this.tempStartLocation2.x <= -canvasWidth) {
            this.tempStartLocation2.x = canvasWidth;
        }

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
    }
}


