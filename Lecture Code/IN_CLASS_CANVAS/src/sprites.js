export class Sprite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.scale = 1;
    }

    update(_dt){}
    draw(_ctx){}
}

export class Particle extends Sprite {
    constructor (x, y, vx, vy, life) {
        super(x, y)
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.size = 3 + Math.random()*3;
        this.h = (Math.random()*360)|0;
        this.dead = false;
    }

    update(dt){
        this.age += dt;
        if (this.age >= this.life) {this.dead = true; return; }
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.rotation += 2 * dt;
        this.scale = 1 + 0.15 * Math.sin(this.age*6);
    }

    draw(ctx){
        const a = 1 - (this.age / this.life);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        ctx.fillstyle = `hsla(${this.h}, 100%, 50%, ${a})`;
        ctx.beginPath();
        ctx.rect(this.size/2, this.size/2, this.size, this.size);
        ctx.fill();
        ctx.restore();
    }

}

export class Emitter extends Sprite {
    constructor(cx, cy) { super(cx, cy); this.arm = 120; this.theta = 0; this.speed = 1.2; }
    update(dt) { this.theta }

}