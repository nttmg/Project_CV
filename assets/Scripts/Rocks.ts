import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min
}

@ccclass('Rocks')
export class Rocks extends Component {
    @property({
        type: Node,
        tooltip: 'Top Rock'
    })
    public topRock: Node;

    @property({
        type: Node,
        tooltip: 'Bottom Rock'
    })
    public bottomRock: Node;


    public tempStartLocationUp : Vec3 = new Vec3(0,0,0);
    public tempStartLocationDown : Vec3 = new Vec3(0,0,0);
    public scene = screen.windowSize;


    public game;
    public rockSpeed: number;
    public tempSpeed: number;

    isPass: boolean;
    isTriggerHaft: boolean;

    onLoad() {

        this.game = find("GameCtrl").getComponent("GameCtrl")
        this.rockSpeed = this.game.rockSpeed;
        this.initPos();
        this.isPass = false;
        
    }

    initPos() {

        this.tempStartLocationUp.x = (this.topRock.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.bottomRock.getComponent(UITransform).width + this.scene.width);

        let gap = random(70,80);
        let topHeight = random(360,400);

        this.tempStartLocationUp.y = topHeight;

        this.tempStartLocationDown.y = (topHeight - (gap * 10));

        this.topRock.setPosition(this.tempStartLocationUp.x, this.tempStartLocationUp.y);
        this.bottomRock.setPosition(this.tempStartLocationDown.x, this.tempStartLocationDown.y);

    }

    update(deltaTime: number) {

        this.tempSpeed = this.rockSpeed * deltaTime;

        this.tempStartLocationDown = this.bottomRock.position;
        this.tempStartLocationUp = this.topRock.position;

        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        this.bottomRock.setPosition(this.tempStartLocationDown);
        this.topRock.setPosition(this.tempStartLocationUp);

        if(this.isPass == false && this.topRock.position.x <= 0) {

            this.isPass =true;

            this.game.passRock();
            this.game.createRock();
        }

        

        if(this.topRock.position.x < ( 0 - this.scene.width)) {
            // this.game.createRock();

            this.destroy()
        }
    }
} 


