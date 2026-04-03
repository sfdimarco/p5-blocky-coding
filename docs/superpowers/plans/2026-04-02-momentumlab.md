# MomentumLab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Rebuild p5-blockly-coding as Vite + React 18 -- a tactile, animated, Scratch-inspired visual coding playground with 20 Blockly blocks, sandboxed p5.js live canvas, and a Gemini Flash AI coach (Rainbowbrain Momentumlab philosophy).

**Architecture:** Three-column layout (Toolbox 20% | Block Workspace 50% | Live Canvas 30%). Floating AI coach pill bottom-right expands to streaming chat panel. Generated JS runs in sandboxed iframe via srcdoc. Blockly v12 with custom block definitions and generators. Gemini 2.0 Flash (free tier) for AI coach.

**Tech Stack:** Vite 6, React 18, Blockly v12, p5.js CDN in iframe, Framer Motion, Tailwind CSS v4, @google/genai (gemini-2.0-flash), Vitest

---

## File Map

| File | Responsibility |
|------|---------------|
| index.html | Vite entry point |
| vite.config.js | Vite + React plugin + Tailwind + Vitest + base path |
| package.json | All dependencies and scripts |
| src/main.jsx | React root mount |
| src/App.jsx | Three-column layout, state: code + peekOpen |
| src/styles/index.css | Tailwind imports + SYN CSS vars + keyframe animations |
| src/components/Header.jsx | Title bar + peek-code toggle button |
| src/components/BlockWorkspace.jsx | Blockly inject, onChange fires setCode |
| src/components/LiveCanvas.jsx | iframe srcdoc runner, debounce 300ms, error overlay, cyan pulse |
| src/components/CodePeek.jsx | Collapsible panel showing generated JS |
| src/components/AiCoach.jsx | Floating pill + expanded streaming chat panel |
| src/components/CoachMessage.jsx | Individual message bubble (user vs coach) |
| src/blocks/definitions.js | All 20 Blockly block shape definitions |
| src/blocks/generators.js | JS code generator for each block |
| src/blocks/toolbox.js | Blockly toolbox JSON with SYN colors |
| src/ai/systemPrompt.js | Rainbowbrain Momentumlab system prompt string |
| src/ai/gemini.js | Gemini Flash streaming client + commented Claude stub |
| src/utils/codeRunner.js | Builds iframe srcdoc from user-generated JS |
| src/utils/codeRunner.test.js | Vitest: verify srcdoc structure |
| src/blocks/generators.test.js | Vitest: verify generator outputs |

---

## Task 1: Scaffold Vite Project

**Files:** index.html, vite.config.js, package.json, src/main.jsx
**Remove:** src/App.js, src/Blocky.js, src/index.js, src/index.css, src/App.css, src/App.test.js, src/logo.svg, src/reportWebVitals.js, src/service-worker.js, src/serviceWorkerRegistration.js, src/setupTests.js

- [ ] Remove old CRA files: rm -f src/App.js src/App.css src/App.test.js src/Blocky.js src/index.js src/index.css src/logo.svg src/reportWebVitals.js src/service-worker.js src/serviceWorkerRegistration.js src/setupTests.js

- [ ] Write package.json with: name=momentumlab, homepage=https://sfdimarco.github.io/p5-blocky-coding, scripts: dev/build/preview/test/predeploy/deploy, deps: @google/genai blockly framer-motion react react-dom, devDeps: @tailwindcss/vite @vitejs/plugin-react gh-pages jsdom tailwindcss vite vitest

- [ ] Write vite.config.js:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/p5-blocky-coding/',
  test: { environment: 'jsdom', globals: true },
})
```

- [ ] Write index.html with Fredoka + Space Mono Google Fonts, div#root, script src=/src/main.jsx

- [ ] Write src/main.jsx mounting React.StrictMode App into #root, importing ./styles/index.css

- [ ] Write minimal App.jsx returning "MomentumLab loading..." to verify dev server

- [ ] Run: npm install

- [ ] Run: npm run dev -- verify http://localhost:5173/p5-blocky-coding/ shows loading text

- [ ] Commit: "feat: scaffold Vite + React 18, remove CRA"

---

## Task 2: Base Styles + SYN Color System

**Files:** src/styles/index.css

- [ ] Write src/styles/index.css with:
  - @import "tailwindcss"
  - :root CSS vars: --syn-0 through --syn-9, --bg #1a1a2e, --surface #16213e, --surface2 #0f3460
  - @keyframes: pulse-cyan (box-shadow glow), shake (x translate), breathe (scale 1 to 1.06), float (y 0 to -6px), pop (scale bump)
  - CSS classes: .pulse-update, .error-shake, .coach-breathe, .coach-float
  - .app-container: flex column height 100vh overflow hidden
  - .panels: grid 3 cols (1fr 2.5fr 1.5fr) flex:1 overflow hidden

- [ ] Verify: npm run dev -- confirm dark background renders

- [ ] Commit: "feat: SYN color system, keyframe animations, base layout CSS"

---

## Task 3: Block Definitions

**Files:** src/blocks/definitions.js

- [ ] Write src/blocks/definitions.js exporting defineBlocks() that registers 20 blocks via Blockly.Blocks:

Canvas (--syn-0 #00bcd4): ml_setup_canvas (inputs W H BG), ml_background (input C)
Shapes (--syn-5 #ef6c00): ml_rect (X Y W H), ml_circle (X Y D), ml_ellipse (X Y W H), ml_line (X1 Y1 X2 Y2), ml_triangle (X1 Y1 X2 Y2 X3 Y3)
Colors (--syn-3 #f9a825): ml_fill (R G B), ml_stroke (R G B), ml_no_stroke (dummy), ml_no_fill (dummy)
Motion (--syn-4 #2e7d32): ml_translate (X Y), ml_rotate (A)
Mouse (--syn-6 #6a1b9a): ml_mouse_x (output Number), ml_mouse_y (output Number), ml_if_mouse_pressed (statement DO)
Loops (--syn-1 #e53935): ml_repeat (input N + statement DO)
Text (--syn-7 #c2185b): ml_text (STR X Y), ml_text_size (S)
Math (--syn-2 #1565c0): ml_random (LO HI output Number), ml_map (V L1 H1 L2 H2 output Number)

All statement blocks: setPreviousStatement(true) + setNextStatement(true)
Guard at top: if (Blockly.Blocks['ml_setup_canvas']) return

- [ ] Commit: "feat: 20 custom p5.js Blockly blocks with SYN colors"

---

## Task 4: Block Generators + Tests

**Files:** src/blocks/generators.js, src/blocks/generators.test.js

- [ ] Write src/blocks/generators.js exporting registerGenerators() using javascriptGenerator.forBlock:
  - ml_setup_canvas: createCanvas(W,H);\nbackground(BG);\n
  - ml_background: background(C);\n
  - ml_rect/circle/ellipse/line/triangle: matching p5.js calls with fallback defaults
  - ml_fill/stroke: fill(R,G,B);\n and stroke(R,G,B);\n
  - ml_no_stroke/no_fill: noStroke();\n and noFill();\n
  - ml_translate: translate(X,Y);\n
  - ml_rotate: rotate(A);\n
  - ml_mouse_x/y: return ['mouseX'/'mouseY', Order.ATOMIC]
  - ml_if_mouse_pressed: if(mouseIsPressed){\n${body}}\n
  - ml_repeat: for(let i=0;i<N;i++){\n${body}}\n
  - ml_text: text(STR,X,Y);\n
  - ml_text_size: textSize(S);\n
  - ml_random: return ['random(LO,HI)', Order.FUNCTION_CALL]
  - ml_map: return ['map(V,L1,H1,L2,H2)', Order.FUNCTION_CALL]

- [ ] Write src/blocks/generators.test.js with Vitest tests for: ml_no_stroke returns 'noStroke();\n', ml_no_fill returns 'noFill();\n', ml_mouse_x returns ['mouseX', ...], ml_mouse_y returns ['mouseY', ...]

- [ ] Run: npm test -- expect 4 tests pass

- [ ] Commit: "feat: block generators + Vitest coverage"

---

## Task 5: Toolbox Config

**Files:** src/blocks/toolbox.js

- [ ] Write src/blocks/toolbox.js exporting TOOLBOX object (kind: categoryToolbox) with 8 custom categories (each with colour matching SYN) + separator + Logic/Variables/standard Math/Text categories

- [ ] Commit: "feat: SYN-colored Blockly toolbox config"

---

## Task 6: codeRunner Utility + Test

**Files:** src/utils/codeRunner.js, src/utils/codeRunner.test.js

- [ ] Write src/utils/codeRunner.js exporting buildSrcdoc(userCode) returning full HTML string with:
  - p5.js CDN script tag (cdnjs, p5.min.js 1.9.4)
  - error-overlay div (absolute, red bg, monospace)
  - window.onerror handler showing overlay
  - p5 global mode: function setup() { createCanvas(windowWidth,windowHeight); } function draw() { try { USER_CODE } catch(e) { show overlay; noLoop(); } }

- [ ] Write codeRunner.test.js with 4 Vitest tests: includes CDN URL, includes user code, includes error-overlay, returns complete HTML doc

- [ ] Run: npm test -- expect 8 total tests pass

- [ ] Commit: "feat: codeRunner srcdoc builder with error overlay"

---

## Task 7: AI System Prompt + Gemini Client

**Files:** src/ai/systemPrompt.js, src/ai/gemini.js

- [ ] Write src/ai/systemPrompt.js exporting SYSTEM_PROMPT string containing full Rainbowbrain Momentumlab prompt (role/goal, communication style, pacing, conversational rules, safety, block color context)

- [ ] Write src/ai/gemini.js:
  - Import GoogleGenerativeAI from @google/genai
  - Create model with 'gemini-2.0-flash' + systemInstruction: SYSTEM_PROMPT
  - Read key from import.meta.env.VITE_GEMINI_API_KEY
  - Export sendMessage(history, userMessage, onChunk) using chat.sendMessageStream()
  - Include full commented Claude API stub using @anthropic-ai/sdk messages.stream()

- [ ] Create .env.local with VITE_GEMINI_API_KEY=your_key (do not commit)

- [ ] Verify .env.local is in .gitignore

- [ ] Commit: "feat: Rainbowbrain Momentumlab system prompt + Gemini Flash streaming client"

---

## Task 8: LiveCanvas Component

**Files:** src/components/LiveCanvas.jsx

- [ ] Write LiveCanvas({ code }) with:
  - useRef for iframe
  - useCallback run() that sets iframeRef.current.srcdoc = buildSrcdoc(code), triggers pulse-update class for 400ms
  - useEffect debouncing run() at 300ms on code change
  - iframe with sandbox="allow-scripts", full height, no border
  - Dark header bar showing "LIVE PREVIEW" in cyan

- [ ] Commit: "feat: LiveCanvas sandboxed iframe with debounce and pulse"

---

## Task 9: BlockWorkspace Component

**Files:** src/components/BlockWorkspace.jsx

- [ ] Write BlockWorkspace({ onCodeChange }) with:
  - Call defineBlocks() + registerGenerators() at module level (guard prevents double-register)
  - INITIAL_XML: setup_canvas 400x400 bg=30, fill(0,188,212), circle(200,200,100)
  - useEffect injecting Blockly with Zelos theme, TOOLBOX, zoom controls, grid snap
  - Load INITIAL_XML via Blockly.Xml.domToWorkspace
  - onChange listener calling javascriptGenerator.workspaceToCode(ws) then onCodeChange
  - Cleanup: ws.dispose()

- [ ] Commit: "feat: BlockWorkspace Zelos theme starter blocks"

---

## Task 10: Header + CodePeek

**Files:** src/components/Header.jsx, src/components/CodePeek.jsx

- [ ] Write Header({ onPeek, peekOpen }) with rainbow gradient title "MomentumLab", "by Rainbowbrain" subtitle, peek toggle button styled with Space Mono font

- [ ] Write CodePeek({ code }) with Framer Motion AnimatePresence height 0->160 spring animation, Space Mono pre element showing code in cyan on dark bg

- [ ] Commit: "feat: Header rainbow title, CodePeek slide animation"

---

## Task 11: AiCoach + CoachMessage

**Files:** src/components/CoachMessage.jsx, src/components/AiCoach.jsx

- [ ] Write CoachMessage({ role, text, isStreaming }) with Framer Motion fade-in, purple pill for user, dark blue for coach, streaming cursor blink, coach-float emoji

- [ ] Write AiCoach() with:
  - useState: open, messages (init with WELCOME message), input, loading
  - Floating pill button: coach-float + coach-breathe animations, gradient purple-pink bg
  - AnimatePresence panel: 340x460, spring scale-up, border --syn-6
  - Messages scroll area with CoachMessage components and ref for auto-scroll
  - Textarea input + send button
  - submit(): appends user msg, appends streaming placeholder, calls sendMessage() with onChunk updating streaming msg, marks streaming false on complete, handles errors gracefully
  - onKey: Enter submits (shift+Enter = newline)

- [ ] Commit: "feat: AiCoach floating pill with streaming Gemini chat"

---

## Task 12: Wire App + Build + Deploy

**Files:** src/App.jsx (final)

- [ ] Write final App.jsx: useState code + peekOpen, useCallback handleCodeChange, render Header + panels div with BlockWorkspace + LiveCanvas + conditional CodePeek + AiCoach

- [ ] Run: npm run dev -- manually verify full app: blocks snap, canvas updates, code peek works, coach opens and responds

- [ ] Run: npm test -- all 8 tests pass

- [ ] Run: npm run build -- dist/ created no errors

- [ ] Run: npm run deploy -- "Published" to sfdimarco.github.io/p5-blocky-coding

- [ ] Final commit + push:
```
git add src/App.jsx
git commit -m "feat: complete MomentumLab v1 - wire layout, build, deploy"
git push
```

---

## Post-Deploy

- [ ] Visit https://sfdimarco.github.io/p5-blocky-coding/ and verify live app
- [ ] Add live demo link to profile README at D:/Mook/sfdimarco-profile-readme/README.md
- [ ] Note: VITE_GEMINI_API_KEY is client-side -- for production consider a proxy server or restricting key by HTTP referrer in Google AI Studio
