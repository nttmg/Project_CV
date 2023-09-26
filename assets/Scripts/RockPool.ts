import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { Rocks } from './Rocks';

@ccclass('RockPool')
export class RockPool extends Component {
    @property({
        type: Prefab,
        tooltip: 'The prefab of rocks'
    })
    public prefabRocks: null;

    @property({
        type: Node,
        tooltip: 'Where the new rocks go'
    })
    public rockPoolHome;

    public pool = new NodePool;
    public createRock: Node = null;

    initPool() {
        let initCount = 3;

        for(let i = 0; i< initCount; i++) {
            let createRock = instantiate(this.prefabRocks);

            if(i == 0) {
                this.rockPoolHome.addChild(createRock);
            } else {
                this.pool.put(createRock);
            }
        }
    }

    addPool() {

        if(this.pool.size() > 0) {
            this.createRock = this.pool.get();
        } else {
            this.createRock = instantiate(this.prefabRocks);
        }

        this.rockPoolHome.addChild(this.createRock);
    }

    reset() {

        this.rockPoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


