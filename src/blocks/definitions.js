import * as Blockly from 'blockly'

const SYN = {
  canvas: '#00bcd4', shapes: '#ef6c00', colors: '#f9a825',
  motion: '#2e7d32', mouse: '#6a1b9a', loops: '#e53935',
  text: '#c2185b', math: '#1565c0',
}

export function defineBlocks() {
  if (Blockly.Blocks['ml_setup_canvas']) return

  Blockly.Blocks['ml_setup_canvas'] = { init() {
    this.appendValueInput('W').setCheck('Number').appendField('canvas width')
    this.appendValueInput('H').setCheck('Number').appendField('height')
    this.appendValueInput('BG').setCheck('Number').appendField('background')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.canvas); this.setTooltip('Create the canvas')
  }}
  Blockly.Blocks['ml_background'] = { init() {
    this.appendValueInput('C').setCheck('Number').appendField('background color')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.canvas)
  }}
  Blockly.Blocks['ml_rect'] = { init() {
    this.appendValueInput('X').setCheck('Number').appendField('rect x')
    this.appendValueInput('Y').setCheck('Number').appendField('y')
    this.appendValueInput('W').setCheck('Number').appendField('w')
    this.appendValueInput('H').setCheck('Number').appendField('h')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.shapes)
  }}
  Blockly.Blocks['ml_circle'] = { init() {
    this.appendValueInput('X').setCheck('Number').appendField('circle x')
    this.appendValueInput('Y').setCheck('Number').appendField('y')
    this.appendValueInput('D').setCheck('Number').appendField('diameter')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.shapes)
  }}
  Blockly.Blocks['ml_ellipse'] = { init() {
    this.appendValueInput('X').setCheck('Number').appendField('ellipse x')
    this.appendValueInput('Y').setCheck('Number').appendField('y')
    this.appendValueInput('W').setCheck('Number').appendField('w')
    this.appendValueInput('H').setCheck('Number').appendField('h')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.shapes)
  }}
  Blockly.Blocks['ml_line'] = { init() {
    this.appendValueInput('X1').setCheck('Number').appendField('line x1')
    this.appendValueInput('Y1').setCheck('Number').appendField('y1')
    this.appendValueInput('X2').setCheck('Number').appendField('x2')
    this.appendValueInput('Y2').setCheck('Number').appendField('y2')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.shapes)
  }}
  Blockly.Blocks['ml_triangle'] = { init() {
    this.appendValueInput('X1').setCheck('Number').appendField('triangle x1')
    this.appendValueInput('Y1').setCheck('Number').appendField('y1')
    this.appendValueInput('X2').setCheck('Number').appendField('x2')
    this.appendValueInput('Y2').setCheck('Number').appendField('y2')
    this.appendValueInput('X3').setCheck('Number').appendField('x3')
    this.appendValueInput('Y3').setCheck('Number').appendField('y3')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.shapes)
  }}
  Blockly.Blocks['ml_fill'] = { init() {
    this.appendValueInput('R').setCheck('Number').appendField('fill r')
    this.appendValueInput('G').setCheck('Number').appendField('g')
    this.appendValueInput('B').setCheck('Number').appendField('b')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.colors)
  }}
  Blockly.Blocks['ml_stroke'] = { init() {
    this.appendValueInput('R').setCheck('Number').appendField('stroke r')
    this.appendValueInput('G').setCheck('Number').appendField('g')
    this.appendValueInput('B').setCheck('Number').appendField('b')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.colors)
  }}
  Blockly.Blocks['ml_no_stroke'] = { init() {
    this.appendDummyInput().appendField('no stroke')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.colors)
  }}
  Blockly.Blocks['ml_no_fill'] = { init() {
    this.appendDummyInput().appendField('no fill')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.colors)
  }}
  Blockly.Blocks['ml_translate'] = { init() {
    this.appendValueInput('X').setCheck('Number').appendField('translate x')
    this.appendValueInput('Y').setCheck('Number').appendField('y')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.motion)
  }}
  Blockly.Blocks['ml_rotate'] = { init() {
    this.appendValueInput('A').setCheck('Number').appendField('rotate angle')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.motion)
  }}
  Blockly.Blocks['ml_mouse_x'] = { init() {
    this.appendDummyInput().appendField('mouse X')
    this.setOutput(true, 'Number'); this.setColour(SYN.mouse)
  }}
  Blockly.Blocks['ml_mouse_y'] = { init() {
    this.appendDummyInput().appendField('mouse Y')
    this.setOutput(true, 'Number'); this.setColour(SYN.mouse)
  }}
  Blockly.Blocks['ml_if_mouse_pressed'] = { init() {
    this.appendDummyInput().appendField('if mouse pressed')
    this.appendStatementInput('DO').appendField('do')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.mouse)
  }}
  Blockly.Blocks['ml_repeat'] = { init() {
    this.appendValueInput('N').setCheck('Number').appendField('repeat')
    this.appendDummyInput().appendField('times')
    this.appendStatementInput('DO').appendField('do')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.loops)
  }}
  Blockly.Blocks['ml_text'] = { init() {
    this.appendValueInput('STR').setCheck('String').appendField('draw text')
    this.appendValueInput('X').setCheck('Number').appendField('at x')
    this.appendValueInput('Y').setCheck('Number').appendField('y')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.text)
  }}
  Blockly.Blocks['ml_text_size'] = { init() {
    this.appendValueInput('S').setCheck('Number').appendField('text size')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour(SYN.text)
  }}
  Blockly.Blocks['ml_random'] = { init() {
    this.appendValueInput('LO').setCheck('Number').appendField('random from')
    this.appendValueInput('HI').setCheck('Number').appendField('to')
    this.setOutput(true, 'Number'); this.setColour(SYN.math)
  }}
  Blockly.Blocks['ml_map'] = { init() {
    this.appendValueInput('V').setCheck('Number').appendField('map')
    this.appendValueInput('L1').setCheck('Number').appendField('from low')
    this.appendValueInput('H1').setCheck('Number').appendField('high')
    this.appendValueInput('L2').setCheck('Number').appendField('to low')
    this.appendValueInput('H2').setCheck('Number').appendField('high')
    this.setOutput(true, 'Number'); this.setColour(SYN.math)
  }}
}