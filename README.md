# p5-blockly-coding

> A three-panel visual coding environment that connects block-based programming to live creative output — built for kids who learn by seeing things move.

## What This Is

A React web app that bridges **Blockly** (visual block programming) and **p5.js** (creative canvas rendering) through a live three-panel interface:

```
┌─────────────────┬──────────────────┬──────────────────┐
│   BLOCK EDITOR  │   GENERATED JS   │   LIVE PREVIEW   │
│   (Blockly)     │   (Monaco)       │   (p5.js canvas) │
└─────────────────┴──────────────────┴──────────────────┘
```

Students drag blocks, watch JavaScript appear in the middle panel, and see the canvas update in real time. The goal: make the invisible visible. Show kids that code is instructions, instructions are shapes, and shapes are ideas made physical.

## Why This Exists

Most coding tools for kids either hide the code entirely (Scratch) or throw them straight into a text editor. This sits in the middle: you see the blocks *and* the code they generate, simultaneously. For visual learners — especially those with ADHD or who think spatially — that parallel view is the difference between confusion and understanding.

## Features

- **Custom p5.js block palette** — `draw_rect`, `draw_ellipse`, `draw_line`, `background` blocks that generate real p5.js code
- **Live code preview** — Monaco Editor displays read-only JS as you build
- **Live canvas** — p5.js re-renders on every block change
- **Export/Import** — Save and load projects as XML files
- **Standard Blockly toolboxes** — Logic, Loops, Math, Variables, Functions

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React (Create React App + PWA) |
| Block editor | Blockly 12 |
| Code editor | Monaco Editor |
| Creative output | p5.js 2 |
| Language | JavaScript (ES6+) |

## Setup

```bash
npm install
npm start
```

Opens at `http://localhost:3000`.

## Extending It

To add a new p5.js block, define both the Blockly block shape and its JavaScript code generator in `App.js` inside `defineP5Blocks()`. Each block follows the pattern:

```js
Blockly.Blocks['your_block'] = { init: function() { ... } };
Blockly.JavaScript['your_block'] = function(block) { return `p5code;\n`; };
```

## Educational Context

Built and tested in K–8 classroom environments. Designed to be projected and demoed live, then handed off for student exploration. No account required, no backend, no data collection — runs entirely in the browser.

## Author

**Sean "Mook" DiMarco** — Creative Technologist, K–8 Educator, 10 years at The Chestnut Hill School, EMPOW Studios (25 schools), MagicSchool AI Certified  
Boston, MA | [sfdimarco.github.io](https://sfdimarco.github.io) | [LinkedIn](https://www.linkedin.com/in/sean-dimarco/)
