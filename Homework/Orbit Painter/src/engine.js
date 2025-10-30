/**
 * engine.js — Frame loop (rAF) for Orbit Painter
 *
 * PURPOSE
 * - Own the animation timing and call your game/app "step" with a frame delta (dt).
 * - Hide browser timing behind a clean API: `engine.start(step)` and `engine.stop()`.
 * - Demonstrate private state using **class private fields** (#raf, #last).
 *
 * WHAT YOU MUST DO IN THIS FILE
 *  1) (Required) Treat `dt` correctly in the rest of your code:
 *     - `step(dtMs)` receives **milliseconds**. Convert to seconds where you integrate motion.
 *     - Clamp large dt spikes in your caller (e.g., `const dt = Math.min(0.032, dtMs/1000);`).
 *
 *  2) (Recommended) Add a simple **FPS meter** using a CLOSURE (not a class):
 *     - Implement `makeFpsMeter()` as a pure function that returns `{ tick(dtMs), value() }`.
 *     - Use private variables inside the closure to accumulate time/frames and compute FPS.
 *     - Integrate it in `main.js` (call `fps.tick(dtMs)` each frame; show `fps.value()` in HUD).
 *
 *  3) (Optional) Add a **pause/resume** helper here if you want central control:
 *     - E.g., `pause()` sets an internal flag so `step` is not called.
 *     - In the provided starter we pause in `main.js`; both approaches are acceptable.
 *
 * RUBRIC HOOKS
 * - Animation loop correctness (stable rAF loop, consistent dt).
 * - Use of closures (via optional FPS meter) to show private state independent of classes.
 *
 * COMMON MISTAKES
 * - Forgetting to convert dtMs to seconds before physics/integration.
 * - Allowing dt to go unbounded after a tab is backgrounded (clamp it).
 * - Calling `requestAnimationFrame` twice per frame; only schedule **once** at the end of loop().
 */

// Engine with a closure-like private monotonic timer via private fields
// TODO[Student-Optional]: Implement an FPS meter here using a closure (see stub below).
export class Engine {
#raf = 0;
#last = 0;


start(step) {
const loop = (t) => {
if (!this.#last) this.#last = t;
const dt = t - this.#last;
this.#last = t;
step(dt);
this.#raf = requestAnimationFrame(loop);
};
this.#raf = requestAnimationFrame(loop);
}


stop() { cancelAnimationFrame(this.#raf); }
}


