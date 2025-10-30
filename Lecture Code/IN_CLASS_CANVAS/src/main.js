import { Emitter } from "./sprites";

const canvas = document.getElementById("c");

const ctx = canvas.getContext('2d');

function fit() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

addEventListener("resize", fit, { passive: true });
fit();

const state = {
    emitter: new Emitter(innerWidth/2, innerHeight/2),
    particles: []
}

function update(dt) {
    state.emitter.update(dt);
    state.emitter.emitInto(state.particles);

    for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.update(dt);
        if (p.dead) state.particles.splice(i, 1);
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRec(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(state.emitter.x, state.emitter.y);
    ctx.strokeStyle = "#6cf"
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, state.emitter.arm, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    for (const p of state.particles) p.draw(ctx);
}

let last = 0;
function loop(t) {
    if (!last)
}