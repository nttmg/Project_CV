import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input, KeyCode, Node, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Plane } from './Plane';
import { RockPool } from './RockPool';
import { PlaneAudio } from './PlaneAudio';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    
    @property({
        type: Component,
        tooltip: 'Add ground prefab owner here'
    })
    public ground: Ground;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of ground'
    })
    public speed: number = 200;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of rock'
    })
    public rockSpeed: number = 200;

    @property({
        type: Results,
        tooltip: 'Add a results here'
    })
    public result: Results;

    @property({
        type: Plane,
        tooltip: 'Add a plane here'
    })
    public plane: Plane

    @property({
        type: RockPool,
        tooltip: 'Add canvas here'
    })
    public rockQueue: RockPool;

    @property({
        type: PlaneAudio,
        tooltip: 'add audio controller'
    })
    public clip: PlaneAudio;

    public isOver: boolean;


    onLoad() {

        this.initListener();

        this.result.resetScore();

        this.isOver = true;

        director.pause();
    }

    initListener() {

        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {

            if(this.isOver == true) {

                this.resetgame();
                this.plane.resetPlane();
                this.startgame();
            }

            if(this.isOver == false) {

                this.plane.fly();

                this.clip.onAudioQueue(0);
            }
        })
    }

    // onKeyDown(event: EventKeyboard) {

    //     switch (event.keyCode) {
    //         case KeyCode.KEY_A:
    //             this.gameOver();
    //             break;
            
    //         case KeyCode.KEY_P:
    //             this.result.addScore();
    //             break;
            
    //         case KeyCode.KEY_Q: 
    //             this.resetgame();
    //             this.plane.resetPlane();
    //     }
    // }
    
    gameOver() {
        this.result.showResult();

        this.isOver = true;

        this.clip.onAudioQueue(3);

        director.pause();
    }

    resetgame() {
        this.result.resetScore();

        this.rockQueue.reset();

        this.isOver = false;

        this.startgame();
    }

    startgame() {

        this.result.hideResult();

        director.resume()
    }

    passRock() {
        this.result.addScore();
        
        this.clip.onAudioQueue(1);
    }

    createRock() {

        this.rockQueue.addPool();
    }

    contactGroundRock() {

        let collider = this.plane.getComponent(Collider2D);

        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(seftCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        this.plane.hitSomething = true;

        this.clip.onAudioQueue(2);
    }

    planeStruck() {

        this.contactGroundRock();

        if(this.plane.hitSomething == true) {

            this.gameOver();
        }
    }

    update() {
        
        if(this.isOver == false) {
            this.planeStruck();
        }
    }
}


