
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
 *  2) Transform Enhancements (Required):
 *     - Add at least one additional transform-driven effect (e.g., a subtle pulsating scale on the emitter
 *       head or a rotating HUD badge). Keep save()/restore() balanced.
 *
 *  3) HUD Overlay (Recommended or Extra Credit):
 *     - Draw a small heads-up display with FPS, particle count, speed, scale, spawnRate, theme, etc.
 *     - Demonstrate at least one transform in HUD rendering (translate to a corner, optional scale).
 *     - Keep the HUD rendering AFTER particles so it appears on top.
 *
 *  4) Blend Mode Toggle (Already wired):
 *     - Honor `cfg.blend` to switch `globalCompositeOperation` between 'lighter' and 'source-over'.
 *     - Ensure you restore globalCompositeOperation (use save()/restore()) to avoid leaking state.
 *
 *  5) Performance Discipline (Required):
 *     - Avoid heavy allocations in tight loops (reuse local variables where possible).
 *     - Keep per-frame state (like `stars`) inside a closure so it is created once, not each frame.
 *
 *  6) DPR / Resize Awareness (Handled in main.js):
 *     - This renderer assumes the 2D context’s transform is already adjusted for DPR by `main.js`.
 *     - Do NOT call `ctx.scale(dpr, dpr)` here; it is handled upstream during resize.
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


function draw(state, settings) {
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
ctx.arc(state.emitter.armLen, 0, 6, 0, Math.PI*2);
ctx.fill();
ctx.restore();


// Particles
for (const p of state.particles) p.draw(ctx);
ctx.restore();


// TODO[Student-Optional]: Draw a HUD overlay (FPS, particle count) using transforms
// Example: translate to top-right and scale text.
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