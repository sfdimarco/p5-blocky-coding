import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CodePeek({ code }) {
  return (
    <AnimatePresence>
      <motion.div
        key="codePeek"
        initial={{ height:0, opacity:0 }}
        animate={{ height:160, opacity:1 }}
        exit={{ height:0, opacity:0 }}
        transition={{ type:'spring', stiffness:300, damping:30 }}
        style={{ overflow:'hidden', background:'#0a1020', borderTop:'2px solid var(--syn-2)', flexShrink:0 }}
      >
        <pre style={{
          margin:0, padding:'10px 16px', height:'100%',
          overflow:'auto', fontFamily:'Space Mono', fontSize:12,
          color:'var(--syn-0)', lineHeight:1.7,
        }}>
          {code || '// snap some blocks to see your code appear here!'}
        </pre>
      </motion.div>
    </AnimatePresence>
  )
}