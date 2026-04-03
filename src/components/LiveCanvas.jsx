import React, { useRef, useEffect, useCallback, useState } from 'react'
import { buildSrcdoc } from '../utils/codeRunner'

const DEBOUNCE_MS = 300

export default function LiveCanvas({ code }) {
  const iframeRef = useRef(null)
  const timerRef  = useRef(null)
  const [cls, setCls] = useState('')

  const run = useCallback((c) => {
    if (!iframeRef.current) return
    iframeRef.current.srcdoc = buildSrcdoc(c)
    setCls('pulse-update')
    setTimeout(() => setCls(''), 420)
  }, [])

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => run(code), DEBOUNCE_MS)
    return () => clearTimeout(timerRef.current)
  }, [code, run])

  return (
    <div style={{ display:'flex', flexDirection:'column', background:'#1a1a2e', borderLeft:'2px solid #0f3460' }}>
      <div style={{
        padding:'7px 14px', background:'#0f3460',
        fontSize:13, fontWeight:700, color:'var(--syn-0)',
        letterSpacing:'0.06em', flexShrink:0,
      }}>
        ▶ LIVE PREVIEW
      </div>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        className={cls}
        title="p5 live preview"
        style={{ flex:1, border:'none', width:'100%', display:'block' }}
      />
    </div>
  )
}