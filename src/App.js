import React, { useRef, useEffect, useState } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import MonacoEditor from 'react-monaco-editor';
import * as p5 from 'p5';
import './App.css';

const initialBlocks = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_repeat_ext" x="20" y="20">
    <value name="TIMES">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
    <statement name="DO">
      <block type="math_change">
        <field name="VAR">i</field>
        <value name="DELTA">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
    </statement>
  </block>
</xml>
`;

// Custom p5.js blocks for Blockly
function defineP5Blocks() {
  if (Blockly.Blocks['draw_rect']) return; // Prevent redefinition
  Blockly.Blocks['draw_rect'] = {
    init: function() {
      this.appendValueInput('X').setCheck('Number').appendField('rect x');
      this.appendValueInput('Y').setCheck('Number').appendField('y');
      this.appendValueInput('W').setCheck('Number').appendField('width');
      this.appendValueInput('H').setCheck('Number').appendField('height');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip('Draw a rectangle');
    }
  };
  javascriptGenerator.forBlock['draw_rect'] = function(block) {
    const x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.Order.NONE) || 0;
    const y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.Order.NONE) || 0;
    const w = javascriptGenerator.valueToCode(block, 'W', javascriptGenerator.Order.NONE) || 50;
    const h = javascriptGenerator.valueToCode(block, 'H', javascriptGenerator.Order.NONE) || 50;
    return `rect(${x}, ${y}, ${w}, ${h});\n`;
  };

  Blockly.Blocks['draw_ellipse'] = {
    init: function() {
      this.appendValueInput('X').setCheck('Number').appendField('ellipse x');
      this.appendValueInput('Y').setCheck('Number').appendField('y');
      this.appendValueInput('W').setCheck('Number').appendField('width');
      this.appendValueInput('H').setCheck('Number').appendField('height');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('Draw an ellipse');
    }
  };
  javascriptGenerator.forBlock['draw_ellipse'] = function(block) {
    const x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.Order.NONE) || 0;
    const y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.Order.NONE) || 0;
    const w = javascriptGenerator.valueToCode(block, 'W', javascriptGenerator.Order.NONE) || 50;
    const h = javascriptGenerator.valueToCode(block, 'H', javascriptGenerator.Order.NONE) || 50;
    return `ellipse(${x}, ${y}, ${w}, ${h});\n`;
  };

  Blockly.Blocks['draw_line'] = {
    init: function() {
      this.appendValueInput('X1').setCheck('Number').appendField('line x1');
      this.appendValueInput('Y1').setCheck('Number').appendField('y1');
      this.appendValueInput('X2').setCheck('Number').appendField('x2');
      this.appendValueInput('Y2').setCheck('Number').appendField('y2');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(100);
      this.setTooltip('Draw a line');
    }
  };
  javascriptGenerator.forBlock['draw_line'] = function(block) {
    const x1 = javascriptGenerator.valueToCode(block, 'X1', javascriptGenerator.Order.NONE) || 0;
    const y1 = javascriptGenerator.valueToCode(block, 'Y1', javascriptGenerator.Order.NONE) || 0;
    const x2 = javascriptGenerator.valueToCode(block, 'X2', javascriptGenerator.Order.NONE) || 100;
    const y2 = javascriptGenerator.valueToCode(block, 'Y2', javascriptGenerator.Order.NONE) || 100;
    return `line(${x1}, ${y1}, ${x2}, ${y2});\n`;
  };

  Blockly.Blocks['draw_background'] = {
    init: function() {
      this.appendValueInput('COLOR').setCheck('Number').appendField('background color');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Set background color (grayscale)');
    }
  };
  javascriptGenerator.forBlock['draw_background'] = function(block) {
    const color = javascriptGenerator.valueToCode(block, 'COLOR', javascriptGenerator.Order.NONE) || 255;
    return `background(${color});\n`;
  };
}

function App() {
  const blocklyDiv = useRef(null);
  const toolbox = useRef(null);
  const [code, setCode] = useState('// Your p5.js code will appear here');
  const [workspace, setWorkspace] = useState(null);
  const canvasRef = useRef(null);
  const [p5Instance, setP5Instance] = useState(null);

  // Blockly setup
  useEffect(() => {
    if (!blocklyDiv.current) return;
    const ws = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      scrollbars: true,
      trashcan: true,
    });
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialBlocks), ws);
    setWorkspace(ws);
    return () => ws.dispose();
  }, []);

  // Generate code from blocks
  useEffect(() => {
    if (!workspace) return;
    const onChange = () => {
      const js = javascriptGenerator.workspaceToCode(workspace);
      setCode(js);
    };
    workspace.addChangeListener(onChange);
    onChange();
    return () => workspace.removeChangeListener(onChange);
  }, [workspace]);

  // p5.js live preview
  useEffect(() => {
    if (!canvasRef.current) return;
    if (p5Instance) {
      p5Instance.remove();
    }
    // eslint-disable-next-line no-new
    const newP5 = new p5((sketch) => {
      try {
        // eslint-disable-next-line no-eval
        eval(code);
      } catch (e) {
        sketch.background(255, 0, 0);
        sketch.text('Error in code', 10, 20);
      }
    }, canvasRef.current);
    setP5Instance(newP5);
    // Cleanup
    return () => newP5.remove();
  }, [code]);

  // Export/import project
  const handleExport = () => {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    const blob = new Blob([xmlText], { type: 'text/xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'project.xml';
    a.click();
  };
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const xml = Blockly.Xml.textToDom(event.target.result);
      Blockly.Xml.domToWorkspace(xml, workspace);
    };
    reader.readAsText(file);
  };

  // Define custom p5.js blocks
  useEffect(() => {
    defineP5Blocks();
  }, []);

  return (
    <div className="App" style={{ display: 'flex', height: '100vh', background: '#f0f8ff' }}>
      {/* Blockly workspace */}
      <div style={{ width: '30%', minWidth: 300, background: '#e3f2fd', padding: 10 }}>
        <h2>Blocks</h2>
        <div ref={blocklyDiv} style={{ height: '60vh', width: '100%', border: '2px solid #90caf9', borderRadius: 8 }} />
        <xml ref={toolbox} style={{ display: 'none' }}>
          <category name="Logic" colour="#5C81A6">
            <block type="controls_if" />
            <block type="logic_compare" />
            <block type="logic_operation" />
            <block type="logic_negate" />
            <block type="logic_boolean" />
            <block type="logic_null" />
            <block type="logic_ternary" />
          </category>
          <category name="Loops" colour="#5CA65C">
            <block type="controls_repeat_ext" />
            <block type="controls_whileUntil" />
            <block type="controls_for" />
            <block type="controls_forEach" />
            <block type="controls_flow_statements" />
          </category>
          <category name="Math" colour="#5C68A6">
            <block type="math_number" />
            <block type="math_arithmetic" />
            <block type="math_single" />
            <block type="math_trig" />
            <block type="math_constant" />
            <block type="math_number_property" />
            <block type="math_round" />
            <block type="math_on_list" />
            <block type="math_modulo" />
            <block type="math_constrain" />
            <block type="math_random_int" />
            <block type="math_random_float" />
            <block type="math_atan2" />
          </category>
          <category name="p5.js Drawing" colour="#FF7043">
            <block type="draw_rect" />
            <block type="draw_ellipse" />
            <block type="draw_line" />
            <block type="draw_background" />
          </category>
          <category name="Variables" colour="#A65C81" custom="VARIABLE" />
          <category name="Functions" colour="#9A5CA6" custom="PROCEDURE" />
        </xml>
        <div style={{ marginTop: 10 }}>
          <button onClick={handleExport} style={{ marginRight: 8 }}>Export Project</button>
          <label style={{ cursor: 'pointer', color: '#1976d2' }}>
            Import Project
            <input type="file" accept=".xml" style={{ display: 'none' }} onChange={handleImport} />
          </label>
        </div>
      </div>
      {/* Code editor */}
      <div style={{ width: '35%', minWidth: 350, background: '#fffde7', padding: 10, display: 'flex', flexDirection: 'column' }}>
        <h2>Code</h2>
        <MonacoEditor
          width="100%"
          height="60vh"
          language="javascript"
          theme="vs-light"
          value={code}
          options={{ fontSize: 16, readOnly: true }}
        />
      </div>
      {/* Live p5.js canvas */}
      <div style={{ width: '35%', minWidth: 350, background: '#e8f5e9', padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Live Preview</h2>
        <div ref={canvasRef} style={{ width: 400, height: 400, border: '2px solid #81c784', borderRadius: 8, background: '#fff' }} />
      </div>
    </div>
  );
}

export default App;
