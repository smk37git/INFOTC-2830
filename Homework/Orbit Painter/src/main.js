/**
 * main.js — App entry point for Orbit Painter
 *
 * PURPOSE
 * - Wire together modules (renderer, engine, sprites, settings).
 * - Own lifecycle: setup canvas (DPR-aware), create state, handle input, run the frame loop.
 * - Convert `dtMs` → seconds and clamp it before updates (stable animation).
 *
 * WHAT YOU MUST DO IN THIS FILE
 *  1) Controls (Required):
 *     - Bind keys for any new settings you add in `settings.js`.
 *       Examples:
 *         - 'C' → clear particles array
 *         - 'T' → cycle theme (if implemented)
 *     - Keep the switch concise; avoid repeating logic across cases.
 *
 *  2) Settings Integration (Required):
 *     - Always read a fresh snapshot with `const cfg = settings.get()` each frame.
 *     - Pass `cfg` to entity updates and ensure your new settings affect behavior/drawing
 *       (e.g., use `cfg.spawnRate` inside `Emitter.emitInto`).
 *
 *  3) Animation Loop Discipline (Required):
 *     - Convert milliseconds to seconds: `const dt = Math.min(0.032, dtMs / 1000)`.
 *     - Do NOT mutate canvas size in the loop; that belongs in `resize()`.
 *
 *  4) Optional Closures (Recommended / Extra Credit):
 *     - Import and instantiate `makeFpsMeter()` from `engine.js` and call `fps.tick(dtMs)` each frame.
 *     - Render the FPS in a HUD (in `renderer.js`) by passing a HUD object if you add that API.
 *
 *  5) DPR & Resize (Already Implemented):
 *     - Keep `resize()` as the single place that sets canvas width/height and context transform.
 *     - Do not call `ctx.scale()` elsewhere for DPR; it is already handled here.
 *
 * RUBRIC HOOKS
 * - Modules: clean use of `import`/`export`.
 * - Animation: correct dt handling and stable loop via Engine.
 * - Interaction: new keys calling `settings` mutators + visible effect in the app.
 *
 * COMMON MISTAKES
 * - Forgetting to guard against `e.repeat` in key handler → runaway changes.
 * - Editing canvas width/height every frame → blurs and performance hits.
 * - Holding onto a stale `cfg` object across frames instead of calling `settings.get()` each time.
 */

import { createRenderer } from './renderer.js';
import { Engine } from './engine.js';
import { Emitter } from './sprites.js';
import { makeSettings } from './settings.js';
// import { makeFpsMeter } from './engine.js'; // Optional closure example


const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('c'));
const ctx = canvas.getContext('2d');


const renderer = createRenderer(canvas, ctx);
const engine = new Engine();
const settings = makeSettings(); // closure-backed settings (private)
// const fps = makeFpsMeter(); // TODO[Student-Optional]: enable and render in HUD


const state = {
emitter: null,
particles: [],
running: true
};


function resize() {
// Device-pixel-ratio aware canvas sizing
const dpr = Math.max(1, Math.round(window.devicePixelRatio || 1));
canvas.width = Math.floor(innerWidth * dpr);
canvas.height = Math.floor(innerHeight * dpr);
canvas.style.width = innerWidth + 'px';
canvas.style.height = innerHeight + 'px';
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener('resize', resize, { passive: true });
resize();


// Create emitter at center
state.emitter = new Emitter(innerWidth/2, innerHeight/2);


function handleKey(e) {
    if (e.repeat) return;
    switch (e.key) {
        case ' ': state.running = !state.running; break;
        case 'ArrowRight': settings.adjustSpeed( +0.2 ); break;
        case 'ArrowLeft': settings.adjustSpeed( -0.2 ); break;
        case 'ArrowUp': settings.adjustScale( +0.1 ); break;
        case 'ArrowDown': settings.adjustScale( -0.1 ); break;
        case 'b': case 'B': settings.toggleBlend(); break;
        // TODO[Student]: Add keys for your new features (e.g., 'C' to clear, 'T' to cycle theme)
        case '=': case '+': settings.adjustSpawnRate( +1 ); break;
        case '-' : settings.adjustSpawnRate ( -1 ); break;
    }
}
addEventListener('keydown', handleKey);


engine.start((dtMs) => {
if (!state.running) return renderer.drawPaused(state, settings);


const dt = Math.min(0.032, dtMs / 1000); // clamp to ~30ms for stability
// fps?.tick?.(dtMs); // TODO[Student-Optional]


// Emit new particles along a rotated arm
const cfg = settings.get(); // read-only snapshot
state.emitter.update(dt, cfg);
state.emitter.emitInto(state.particles, cfg);


// Update particles
for (let i = state.particles.length - 1; i >= 0; i--) {
const p = state.particles[i];
p.update(dt, cfg);
if (p.dead) state.particles.splice(i, 1);
}


renderer.draw(state, settings);
});

// ===== Helper commands students may extend ================================
// TODO[Student]: Example helper to clear particles; bind to a key in handleKey
// function clearParticles() { state.particles.length = 0; }