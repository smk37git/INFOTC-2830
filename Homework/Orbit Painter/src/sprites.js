/**
 * sprites.js — Entities for the Orbit Painter assignment
 *
 *  5) Documentation (Required):
 *     - Comment your subclass: explain what is unique about your draw() and update().
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
        const spawnRate = cfg.spawnRate;

        // TODO[Student]: make this depend on settings
        for (let i = 0; i < spawnRate; i++) {
            if (Math.random() > 0.5) {
                outArray.push(new Particle(
                    ex, ey,
                    vx*(0.8+0.4*Math.random()),
                    vy*(0.8+0.4*Math.random())
                ));
            } else {
                outArray.push(new RingParticle(
                    ex, ey,
                    vx*(0.30+0.7*Math.random()),
                    vy*(0.30+0.7*Math.random())
                ));
            }
        }
    }
}

// export class RingParticle extends Particle { /* ... */ }
// SUBCLASS OF PARTICLE
export class RingParticle extends Particle {
    constructor(x, y, vx, vy, life=1) {
        // Get parent variables
        super(x, y, vx, vy, life);
        this.vx = vx; this.vy = vy;
        this.life = life; // seconds
        this.age = 0;
        
        // Smaller size
        this.size = 3 + Math.random()*4;

        // Change hue slightly
        this.hue = (Math.random()*350)|0;

        this.dead = false;
    }

    // Rings rotate faster, start smaller and get bigger
    update(dt, _cfg) {
        this.age += dt;
        if (this.age >= this.life) { this.dead = true; return; }
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.rot += 5 * dt;
        this.scale = 1 + 0.5*Math.sin(this.age*6);
    }

    // Rings have 3 size line-width, size 3 overall NOW in ARC instead of ctx.rec
    draw(ctx) {
        const a = 1 - (this.age / this.life);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);

        // Set custom scale
        ctx.scale(this.scale, this.scale);
        
        // Fill and Stroke styles
        ctx.fillStyle = `hsla(${this.hue} 80% 50% / ${a.toFixed(5)})`;
        ctx.strokeStyle = `hsla(${this.hue} 70% 25% / ${a.toFixed(5)})`;

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.restore();
    }
}