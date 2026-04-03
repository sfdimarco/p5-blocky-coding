import React from 'react'

export default function Header({ onPeek, peekOpen }) {
  return (
    <header style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'8px 16px', background:'#0f3460',
      borderBottom:'2px solid var(--syn-0)', flexShrink:0,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ fontSize:22 }}>🌈</span>
        <span style={{
          fontFamily:'Fredoka', fontWeight:700, fontSize:22,
          background:'linear-gradient(90deg,#00bcd4,#c2185b,#f9a825)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        }}>
          MomentumLab
        </span>
        <span style={{ color:'var(--syn-6)', fontSize:11, opacity:0.7 }}>
          by Rainbowbrain
        </span>
      </div>
      <button onClick={onPeek} style={{
        background: peekOpen ? 'var(--syn-2)' : 'transparent',
        border:'1px solid var(--syn-2)', borderRadius:6,
        color:'var(--syn-8)', fontFamily:'Space Mono', fontSize:12,
        padding:'4px 14px', cursor:'pointer', transition:'background 0.2s',
      }}>
        {peekOpen ? '{ hide code }' : '{ peek at code }'}
      </button>
    </header>
  )
}