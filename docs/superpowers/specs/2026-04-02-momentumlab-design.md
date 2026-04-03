# MomentumLab Design Spec
Date: 2026-04-02 | Project: p5-blockly-coding (Vite rebuild)

## Stack
Vite 6 + React 18 + Blockly v12 + p5.js (CDN iframe) + Framer Motion + Tailwind v4 + Gemini Flash

## File Structure
src/App.jsx, components/BlockWorkspace.jsx, LiveCanvas.jsx, CodePeek.jsx,
AiCoach.jsx, CoachMessage.jsx, blocks/definitions.js, generators.js,
toolbox.js, ai/gemini.js, systemPrompt.js, utils/codeRunner.js

## Layout
Three columns: Toolbox 20% | Block Workspace 50% | Live Canvas 30%
AI Coach: floating pill (bottom-right) expands to chat panel

## SYN Color System
Canvas=Cyan(0) Shapes=Orange(5) Colors=Yellow(3) Motion=Green(4)
Mouse=Purple(6) Loops=Red(1) Text=Pink(7) Math=Blue(2)

## Blocks (20 total)
Canvas: setup_canvas, set_background
Shapes: draw_rect, draw_circle, draw_ellipse, draw_line, draw_triangle
Colors: set_fill, set_stroke, no_stroke, no_fill
Motion: translate, rotate
Mouse: mouse_x(val), mouse_y(val), if_mouse_pressed
Loops: repeat_n_times
Text: draw_text, text_size
Math: random(val), map_value(val)

## Live Canvas
iframe srcdoc sandbox=allow-scripts. p5.js CDN. Auto-runs debounced 300ms.
Error overlay. Border pulses cyan on update.

## AI Coach
Model: gemini-2.0-flash via @google/genai. VITE_GEMINI_API_KEY env var.
Streaming responses. Full message history. Commented Claude stub included.

## System Prompt
Role: Coach for 4-5th graders. Guide never do. Success = student understanding.
Style: Colorful visual simple words connect to things kids love vary phrasing.
Pacing: Easy first deeper when ready always leave curiosity hook.
Listening: Validate ideas be patient never make them feel wrong.
Safety: Redirect inappropriate content back to game project warmly.
Context: Blockly blocks only. Reference block names when guiding.

## Tactile UX
Block snap pop. Canvas pulse cyan on update. Coach breathing idle.
Error shake. Framer Motion spring physics throughout.

## Deploy
vite build -> dist -> gh-pages -> sfdimarco.github.io/p5-blocky-coding
