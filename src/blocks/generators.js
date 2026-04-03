import { javascriptGenerator, Order } from 'blockly/javascript'

export function registerGenerators() {
  const g = javascriptGenerator
  const N = Order.NONE
  const AT = Order.ATOMIC
  const FC = Order.FUNCTION_CALL

  g.forBlock['ml_setup_canvas'] = (b) => {
    const w  = g.valueToCode(b,'W',N)||400
    const h  = g.valueToCode(b,'H',N)||400
    const bg = g.valueToCode(b,'BG',N)||30
    return `createCanvas(${w},${h});\nbackground(${bg});\n`
  }
  g.forBlock['ml_background'] = (b) => `background(${g.valueToCode(b,'C',N)||220});\n`
  g.forBlock['ml_rect'] = (b) => {
    const x=g.valueToCode(b,'X',N)||0, y=g.valueToCode(b,'Y',N)||0
    const w=g.valueToCode(b,'W',N)||50, h=g.valueToCode(b,'H',N)||50
    return `rect(${x},${y},${w},${h});\n`
  }
  g.forBlock['ml_circle'] = (b) => {
    const x=g.valueToCode(b,'X',N)||200, y=g.valueToCode(b,'Y',N)||200
    const d=g.valueToCode(b,'D',N)||80
    return `circle(${x},${y},${d});\n`
  }
  g.forBlock['ml_ellipse'] = (b) => {
    const x=g.valueToCode(b,'X',N)||0, y=g.valueToCode(b,'Y',N)||0
    const w=g.valueToCode(b,'W',N)||50, h=g.valueToCode(b,'H',N)||50
    return `ellipse(${x},${y},${w},${h});\n`
  }
  g.forBlock['ml_line'] = (b) => {
    const x1=g.valueToCode(b,'X1',N)||0, y1=g.valueToCode(b,'Y1',N)||0
    const x2=g.valueToCode(b,'X2',N)||100, y2=g.valueToCode(b,'Y2',N)||100
    return `line(${x1},${y1},${x2},${y2});\n`
  }
  g.forBlock['ml_triangle'] = (b) => {
    const x1=g.valueToCode(b,'X1',N)||0, y1=g.valueToCode(b,'Y1',N)||0
    const x2=g.valueToCode(b,'X2',N)||50, y2=g.valueToCode(b,'Y2',N)||100
    const x3=g.valueToCode(b,'X3',N)||100, y3=g.valueToCode(b,'Y3',N)||0
    return `triangle(${x1},${y1},${x2},${y2},${x3},${y3});\n`
  }
  g.forBlock['ml_fill'] = (b) => {
    const r=g.valueToCode(b,'R',N)||255, gr=g.valueToCode(b,'G',N)||255, bl=g.valueToCode(b,'B',N)||255
    return `fill(${r},${gr},${bl});\n`
  }
  g.forBlock['ml_stroke'] = (b) => {
    const r=g.valueToCode(b,'R',N)||0, gr=g.valueToCode(b,'G',N)||0, bl=g.valueToCode(b,'B',N)||0
    return `stroke(${r},${gr},${bl});\n`
  }
  g.forBlock['ml_no_stroke'] = () => `noStroke();\n`
  g.forBlock['ml_no_fill']   = () => `noFill();\n`
  g.forBlock['ml_translate'] = (b) => {
    const x=g.valueToCode(b,'X',N)||0, y=g.valueToCode(b,'Y',N)||0
    return `translate(${x},${y});\n`
  }
  g.forBlock['ml_rotate'] = (b) => `rotate(${g.valueToCode(b,'A',N)||0});\n`
  g.forBlock['ml_mouse_x'] = () => ['mouseX', AT]
  g.forBlock['ml_mouse_y'] = () => ['mouseY', AT]
  g.forBlock['ml_if_mouse_pressed'] = (b) => {
    const body = g.statementToCode(b,'DO')
    return `if(mouseIsPressed){\n${body}}\n`
  }
  g.forBlock['ml_repeat'] = (b) => {
    const n=g.valueToCode(b,'N',N)||10
    const body=g.statementToCode(b,'DO')
    return `for(let i=0;i<${n};i++){\n${body}}\n`
  }
  g.forBlock['ml_text'] = (b) => {
    const s=g.valueToCode(b,'STR',N)||"'hello'"
    const x=g.valueToCode(b,'X',N)||50, y=g.valueToCode(b,'Y',N)||50
    return `text(${s},${x},${y});\n`
  }
  g.forBlock['ml_text_size'] = (b) => `textSize(${g.valueToCode(b,'S',N)||16});\n`
  g.forBlock['ml_random'] = (b) => {
    const lo=g.valueToCode(b,'LO',N)||0, hi=g.valueToCode(b,'HI',N)||100
    return [`random(${lo},${hi})`, FC]
  }
  g.forBlock['ml_map'] = (b) => {
    const v=g.valueToCode(b,'V',N)||0
    const l1=g.valueToCode(b,'L1',N)||0, h1=g.valueToCode(b,'H1',N)||100
    const l2=g.valueToCode(b,'L2',N)||0, h2=g.valueToCode(b,'H2',N)||400
    return [`map(${v},${l1},${h1},${l2},${h2})`, FC]
  }
}