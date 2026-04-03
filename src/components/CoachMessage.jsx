import React from 'react'
import { motion } from 'framer-motion'

export default function CoachMessage({ role, text, isStreaming }) {
  const isCoach = role === 'model'
  return (
    <motion.div
      initial={{ opacity:0, y:8, scale:0.97 }}
      animate={{ opacity:1, y:0, scale:1 }}
      transition={{ type:'spring', stiffness:400, damping:28 }}
      style={{
        display:'flex',
        justifyContent: isCoach ? 'flex-start' : 'flex-end',
        marginBottom:8, alignItems:'flex-end',
      }}
    >
      {isCoach && <span style={{ marginRight:6, fontSize:16, flexShrink:0 }}>🧠</span>}
      <div style={{
        maxWidth:'80%', padding:'8px 13px',
        borderRadius: isCoach ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
        background: isCoach ? '#0f3460' : 'var(--syn-6)',
        color:'#f5f5f5', fontSize:14, lineHeight:1.55,
        fontFamily:'Fredoka', fontWeight:400,
        boxShadow: isCoach
          ? '0 2px 10px rgba(0,188,212,0.15)'
          : '0 2px 10px rgba(106,27,154,0.3)',
      }}>
        {text || (isStreaming ? '' : '')}
        {isStreaming && <span style={{ opacity:0.5, marginLeft:2 }}>▌</span>}
      </div>
    </motion.div>
  )
}