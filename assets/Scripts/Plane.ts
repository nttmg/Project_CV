import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('Plane')
export class Plane extends Component {
    @property({
        type: CCFloat,
        tooltip: 'how high does he fly'
    })
    public jumpHeight:  number = 1.5;

    @property({
        type: CCFloat,
        tooltip: 'how long does he fly'
    })
    public jumpDuration: number = 1.5;

    

    public planeAnimation: Animation;

    public planeLocation: Vec3;

    public hitSomething: boolean;

    onLoad() {
        this.resetPlane();

        this.planeAnimation = this.getComponent(Animation);
    }

    resetPlane() {

        this.planeLocation = new Vec3(0, 0, 0);

        this.node.setPosition(this.planeLocation);

        this.hitSomething = false;
    }

    fly() {

        this.planeAnimation.stop();

        

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {easing: "smooth",
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
        })
        .start();

        this.planeAnimation.play();
    }

    
}


