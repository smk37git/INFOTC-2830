/**
 * settings.js — Closure-backed configuration for Orbit Painter
 *
 * PURPOSE
 * - Demonstrate a true JavaScript closure (module-level private variables captured
 *   by returned functions) WITHOUT using a class.
 * - Provide a single source of truth for runtime configuration (speed, scale, etc.).
 *
 * WHAT YOU MUST DO IN THIS FILE
 *  1) Add at least ONE new setting and expose it through the closure:
 *     - Examples: `spawnRate` (particles per tick), `theme` (name or object).
 *     - Store it in private vars next to `speed/scale/blend`.
 *     - Return it from `get()` so renderers/sprites can read it.
 *     - Provide mutators (e.g., `adjustSpawnRate(d)`, `nextTheme()`).
 * 
 *    DONE
 *
 *  2) Enforce bounds/validation inside mutators:
 *     - Clamp numbers (e.g., `spawnRate` between 1 and 20).
 *          DONE
 *     - Cycle indices safely for theme arrays.
 *
 *  3) Keep the state PRIVATE:
 *     - Do NOT export the raw variables.
 *     - `get()` should return a fresh POJO snapshot, not live references to internal state.
 *
 *  4) Wire your new setting into the rest of the app:
 *     - In `Emitter.emitInto(...)` use `cfg.spawnRate` to decide how many particles to create.
*            DONE
 *     - In `renderer.draw(...)` use `cfg.theme` for background or styling if you add themes.
 *     - In `main.js` bind keys to your mutators (e.g., +/- to adjust spawn rate, T to cycle theme).
 *           Done for spawn rate
 *
 * INTEGRATION CHECKPOINTS (Rubric hooks)
 * - Closures: This file is your primary evidence. No `class` here.
 * - Interaction: New keys call mutators here; visuals change elsewhere based on `get()`.
 * - Code quality: Clear comments, bounds checking, and no global leaks.
 *
 * COMMON MISTAKES TO AVOID
 * - Returning the internal object by reference (callers could mutate it).
 * - Forgetting to clamp values, causing NaNs or runaway speeds.
 * - Introducing globals (e.g., `arr = [...]` at top-level). If you need scratch data, scope it
 *   INSIDE `makeSettings()` or delete it. Globals will be flagged during grading.
 */

// Closure for private settings (no class). Demonstrates closures & encapsulation without fields.
// TODO[Student]: Add at least one more setting (e.g., theme, spawnRate) and wire it in.
export function makeSettings() {
let speed = 1.2; // radians/sec multiplier
let scale = 1.0; // emitter arm scale
let blend = false; // composite toggle
// TODO[Student]: e.g., let theme = 'vivid';
// Initial spawn rate is 5
let spawnRate = 5;


  // ---- Public API (methods close over the private vars) --------------------

return {
  // Always return a read-only snapshot (prevents outside mutation).
  get() { return { speed, scale, blend, spawnRate /*, theme, */ }; }, // read-only snapshot
  adjustSpeed(d) { speed = Math.max(0.1, speed + d); },
  adjustScale(d) { scale = Math.max(0.2, Math.min(3, scale + d)); },
  toggleBlend() { blend = !blend; },

  // TODO[Student]: add mutators, e.g., cycleTheme()
  // Adjust spawn rate, with a max rate of 20, a min of 1
  adjustSpawnRate(d) { spawnRate = Math.max(1, Math.min(20, spawnRate + d));

  }

};
}