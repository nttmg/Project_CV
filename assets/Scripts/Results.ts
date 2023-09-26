import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label,
        tooltip: 'Current Score'
    })
    public scoreLabel: Label;

    @property({
        type: Label,
        tooltip: 'High Score'
    })
    public highScore:Label;

    @property({
        type: Label,
        tooltip: 'Try Again?'
    })
    public resultEnd: Label;

    maxScore: number = 0;
    currentScore: number;


    updateScore(num:number) {
        this.currentScore = num;

        this.scoreLabel.string = ('' + this.currentScore);
    }

    resetScore() {
        this.updateScore(0);

        this.hideResult();

        this.scoreLabel.string = ('' + this.currentScore);
    }

    addScore() {

        this.updateScore(this.currentScore + 1);
    }

    showResult() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);

        this.highScore.string = 'High Score is: ' + this.maxScore;
        this.highScore.node.active = true;

        this.resultEnd.node.active = true;
    }

    hideResult() {
        this.highScore.node.active = false;

        this.resultEnd.node.active = false;
    }
}


