
/**
 * renderer.js — Canvas rendering pipeline for Orbit Painter
 *
 * PURPOSE
 * - Encapsulate all drawing for the app: background, emitter, particles, and optional HUD.
 * - Demonstrate proper Canvas transforms (translate/rotate/scale) with save()/restore() discipline.
 * - Show how to read the settings closure (`settings.get()`) and render accordingly.
 *
 * WHAT YOU MUST DO IN THIS FILE
 *  1) Visual Theming / Background (Required if you added `theme`):
 *     - Read `const cfg = settings.get()` and use `cfg.theme.bg` (or similar) as the clear color.
 *     - Replace the hard-coded `'#0b0b0f'` with your theme background.
 *
 *  3) HUD Overlay (Recommended or Extra Credit):
 *     - Draw a small heads-up display with FPS, particle count, speed, scale, spawnRate, theme, etc.
 *     - Demonstrate at least one transform in HUD rendering (translate to a corner, optional scale).
 *     - Keep the HUD rendering AFTER particles so it appears on top.
 *
 * RUBRIC HOOKS IN THIS FILE
 * - Transforms: emitter arm and your added transform effects.
 * - Canvas API: save()/restore(), translate/rotate/scale, stroke/fill usage.
 * - Settings integration: background/theme, blend toggle, HUD values derived from `settings.get()`.
 *
 * COMMON MISTAKES
 * - Forgetting save()/restore(): leads to accumulating transforms and broken drawing.
 * - Modifying globalCompositeOperation without restoring.
 * - Hard-coding colors when a theme is provided in settings.
 */

export function createRenderer(canvas, ctx) {
    // Simple starfield background held in a closure (private to renderer)
    const stars = (() => {
    const pts = [];
    for (let i=0;i<200;i++) pts.push([Math.random()*innerWidth, Math.random()*innerHeight, Math.random()*0.8+0.2]);
        return pts;
    })();


    function clear(bg = '#111') {
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0); // reset for full-canvas clear
        ctx.fillStyle = bg;
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.restore();
    }


function draw(state, settings, fps) {
    clear('#0b0b0f');
    const cfg = settings.get();


    // Background stars (no transforms)
    ctx.save();
    for (const [sx, sy, a] of stars) {
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fillRect(sx, sy, 1, 1);
    }
    ctx.restore();


    // Optional blend trails
    ctx.save();
    ctx.globalCompositeOperation = cfg.blend ? 'lighter' : 'source-over';


    // Draw emitter arm using transforms
    ctx.save();
    ctx.translate(state.emitter.x, state.emitter.y);
    ctx.rotate(state.emitter.theta);
    // TODO[Student-Transforms]: Add a subtle pulsating factor here for extra credit.
    ctx.scale(cfg.scale, cfg.scale); 
    ctx.strokeStyle = '#6cf';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(state.emitter.armLen, 0);
    ctx.stroke();


    // Emitter head
    ctx.fillStyle = '#6cf';
    ctx.beginPath();

    // Add pulsing radius variable using Sin WAVES, emitter head pulses small and big
    const pulseRadius = 6 + 2 * Math.sin(state.emitter.theta * 3);
    ctx.arc(state.emitter.armLen, 0, pulseRadius, 0, Math.PI*2);

    ctx.fill();
    ctx.restore();


    // Particles
    for (const p of state.particles) p.draw(ctx);
    ctx.restore();


    // TODO[Student-Optional]: Draw a HUD overlay (FPS, particle count) using transforms
    // Example: translate to top-right and scale text.

    // HUD code for particles, spawnRate, speed, scale, blend
    ctx.save();
    ctx.translate(20, innerHeight - 20);
    ctx.fillStyle = '#fff';
    ctx.font = '16px system-ui';

    // FPS + HUD display
    ctx.fillText(`FPS: ${fps.value()}`, 0, -100);

    ctx.fillText(`Particles: ${state.particles.length}`, 0, 0);
    ctx.fillText(`Spawn Rate: ${cfg.spawnRate}`, 0, -20);
    ctx.fillText(`Speed: ${cfg.speed.toFixed(1)}`, 0, -40);
    ctx.fillText(`Scale: ${cfg.scale.toFixed(1)}`, 0, -60);
    ctx.fillText(`Blend: ${cfg.blend ? 'ON' : 'OFF'}`, 0, -80);

    ctx.restore();

    }


    function drawPaused(state, settings) {
        draw(state, settings);
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.font = '600 20px system-ui';
        ctx.fillText('PAUSED', 20, 40);
        ctx.restore();
    }

    return { draw, drawPaused };

}