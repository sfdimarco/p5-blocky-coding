import React, { useRef, useEffect } from 'react'
import * as Blockly from 'blockly'
import 'blockly/blocks'
import { javascriptGenerator } from 'blockly/javascript'
import { defineBlocks } from '../blocks/definitions'
import { registerGenerators } from '../blocks/generators'
import { TOOLBOX } from '../blocks/toolbox'

defineBlocks()
registerGenerators()

const INITIAL_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="ml_setup_canvas" x="20" y="20">
    <value name="W"><block type="math_number"><field name="NUM">400</field></block></value>
    <value name="H"><block type="math_number"><field name="NUM">400</field></block></value>
    <value name="BG"><block type="math_number"><field name="NUM">30</field></block></value>
    <next><block type="ml_fill">
      <value name="R"><block type="math_number"><field name="NUM">0</field></block></value>
      <value name="G"><block type="math_number"><field name="NUM">188</field></block></value>
      <value name="B"><block type="math_number"><field name="NUM">212</field></block></value>
      <next><block type="ml_circle">
        <value name="X"><block type="math_number"><field name="NUM">200</field></block></value>
        <value name="Y"><block type="math_number"><field name="NUM">200</field></block></value>
        <value name="D"><block type="math_number"><field name="NUM">120</field></block></value>
      </block></next>
    </block></next>
  </block>
</xml>`

export default function BlockWorkspace({ onCodeChange }) {
  const divRef = useRef(null)
  const wsRef  = useRef(null)

  useEffect(() => {
    if (!divRef.current || wsRef.current) return
    const ws = Blockly.inject(divRef.current, {
      toolbox: TOOLBOX,
      scrollbars: true,
      trashcan: true,
      zoom: { controls:true, wheel:true, startScale:0.85, maxScale:2, minScale:0.3 },
      grid: { spacing:20, length:3, colour:'#1e2a45', snap:true },
      theme: Blockly.Themes.Zelos,
    })
    wsRef.current = ws
    try {
      Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(INITIAL_XML), ws)
    } catch(e) { console.warn('Initial XML load failed:', e) }

    const onChange = () => {
      const code = javascriptGenerator.workspaceToCode(ws)
      onCodeChange(code)
    }
    ws.addChangeListener(onChange)
    onChange()
    return () => { ws.dispose(); wsRef.current = null }
  }, [onCodeChange])

  return (
    <div style={{ position:'relative', overflow:'hidden', background:'#16213e' }}>
      <div ref={divRef} style={{ width:'100%', height:'100%' }} />
    </div>
  )
}