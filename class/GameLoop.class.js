/*
 * A main loop useful for games and other animated applications.
 */


"use strict";


class GameLoop {
    constructor() {
        this.simulationTimestep = 1000 / 60;
        this.frameDelta = 0;
        this.lastFrameTimeMs = 0;
        this.fps = 2; //60
        this.fpsAlpha = 0.9;
        this.fpsUpdateInterval = 1000;
        this.lastFpsUpdate = 0;
        this.framesSinceLastFpsUpdate = 0;
        this.numUpdateSteps = 0;
        this.minFrameDelay = 0;

        window.requestAnimationFrame(this.gameLoop.bind(this));

        this.loopStack = [];
    }

    removeAction(item_intance) {
        let index = this.loopStack.findIndex((item) => item_intance === item);
        this.loopStack.splice(index, 1);
    }

    addAction(item) {
        this.loopStack.push(item);
    }

    clear_timestamp() {
        this.delta = 0
    }

    update(delta) {
        $.each(this.loopStack, (i, item) => item ? item.update(delta) : '')
    }

    gameLoop(timestamp) {

        // Chill
        if (timestamp < this.lastFrameTimeMs + this.minFrameDelay) {
            return;
        }
        this.frameDelta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        if (timestamp > this.lastFpsUpdate + this.fpsUpdateInterval) {
            this.fps = this.fpsAlpha * this.framesSinceLastFpsUpdate * 1000 / (timestamp - this.lastFpsUpdate) +
                (1 - this.fpsAlpha) * this.fps;

            this.lastFpsUpdate = timestamp;
            this.framesSinceLastFpsUpdate = 0;
        }
        this.framesSinceLastFpsUpdate++;
        this.numUpdateSteps = 0;

        while (this.frameDelta >= this.simulationTimestep) {
            this.update(this.simulationTimestep);
            this.frameDelta -= this.simulationTimestep;
            if (++this.numUpdateSteps >= 240) {
                console.log('PANIC');
                break;
            }
        }

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }
}