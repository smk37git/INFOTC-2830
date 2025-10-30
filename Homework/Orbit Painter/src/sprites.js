/**
 * sprites.js — Entities for the Orbit Painter assignment
 *
 * WHAT THIS MODULE IS:
 * - Defines the renderable/animatable entities drawn on <canvas>.
 * - Demonstrates ES6 classes and inheritance: Sprite → Particle (and your subclass).
 *
 * WHAT YOU (THE STUDENT) MUST DO IN THIS FILE:
 *  1) Inheritance (Required):
 *     - Create at least ONE subclass of Particle (e.g., RingParticle, SparkParticle).
 *     - Override draw(ctx) to render a different shape/effect (arcs, gradients, lines, etc.).
 *     - Optionally override update(dt, cfg) to change behavior (spin, pulsate, accelerate).
 *
 *  2) Settings Integration (Required):
 *     - Make emission count depend on a setting (e.g., cfg.spawnRate).
 *     - You can also read cfg.scale, cfg.speed, or any new setting you add (theme, color mode).
 *
 *  3) Transforms & Style (Required):
 *     - Use ctx.save()/restore(), ctx.translate/rotate/scale inside draw().
 *     - Use both fill and stroke at least once in your subclass.
 *
 *  4) Performance & Lifecycle (Required):
 *     - Keep particles short-lived; ensure they set this.dead = true when finished.
 *     - Avoid expensive per-frame allocations inside hot loops where possible.
 *
 *  5) Documentation (Required):
 *     - Comment your subclass: explain what is unique about your draw() and update().
 *
 * OPTIONAL EXTENSIONS (Extra Credit):
 *  - Deterministic visuals using a seeded RNG (passed in via emitInto’s rand parameter).
 *  - Parameterize color by theme or velocity; compose multiple subclasses per frame.
 *  - Add simple collisions or “splash” bursts on certain conditions.
 *
 * RUBRIC HOOKS IN THIS FILE:
 *  - Classes + Inheritance: Sprite, Particle, and YOUR subclass.
 *  - Canvas transforms: inside Particle.draw(...) and YOUR subclass draw(...).
 *  - Integration with settings (spawn rate, themes, etc.) in Emitter.emitInto(...).
 *
 * DO NOT:
 *  - Mutate canvas global state without restoring (always use save()/restore()).
 *  - Introduce globals; keep behavior controlled by cfg and constructor args.
 */

// Base class + inheritance requirement

export class Sprite {
constructor(x=0, y=0) {
this.x = x; this.y = y; this.rot = 0; this.scale = 1;
}
update(_dt, _cfg) {}
draw(_ctx) {}
}


export class Particle extends Sprite {
constructor(x, y, vx, vy, life=1.2) {
super(x, y);
this.vx = vx; this.vy = vy;
this.life = life; // seconds
this.age = 0;
this.size = 4 + Math.random()*6;
this.hue = (Math.random()*360)|0;
this.dead = false;
}
update(dt, _cfg) {
this.age += dt;
if (this.age >= this.life) { this.dead = true; return; }
this.x += this.vx * dt;
this.y += this.vy * dt;
this.rot += 2 * dt;
this.scale = 1 + 0.2*Math.sin(this.age*6);
}
draw(ctx) {
const a = 1 - (this.age / this.life); // fade
ctx.save();
ctx.translate(this.x, this.y);
ctx.rotate(this.rot);
ctx.scale(this.scale, this.scale);
ctx.fillStyle = `hsla(${this.hue} 90% 60% / ${a.toFixed(3)})`;
ctx.strokeStyle = `hsla(${this.hue} 90% 30% / ${a.toFixed(3)})`;
ctx.lineWidth = 1.5;
// Transformed rect “diamond”
ctx.beginPath();
ctx.rect(-this.size/2, -this.size/2, this.size, this.size);
ctx.fill(); ctx.stroke();
ctx.restore();
}
}


export class Emitter extends Sprite {
constructor(cx, cy) {
super(cx, cy);
this.armLen = 140;
this.theta = 0;
}
update(dt, cfg) {
this.theta += dt * cfg.speed; // radians
}
emitInto(outArray, cfg) {
// TODO[Student]: Consider using cfg.spawnRate (if you add it) to vary emission count.
const arm = this.armLen * cfg.scale;
const ex = this.x + Math.cos(this.theta) * arm;
const ey = this.y + Math.sin(this.theta) * arm;
const speed = 60 + Math.random()*40;
const ang = this.theta + (Math.random()-0.5)*0.6;
const vx = Math.cos(ang) * speed;
const vy = Math.sin(ang) * speed;
for (let i=0;i<3;i++) { // TODO[Student]: make this depend on settings
outArray.push(new Particle(
ex, ey,
vx*(0.8+0.4*Math.random()),
vy*(0.8+0.4*Math.random())
));
}
}
}


// export class RingParticle extends Particle { /* ... */ }