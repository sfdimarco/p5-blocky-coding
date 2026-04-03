import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CoachMessage from './CoachMessage'
import { sendMessage } from '../ai/gemini'

const WELCOME = "Hey there, game maker! 🎮 I am Coach — I am here to help you build something awesome in MomentumLab! What kind of game or art are you thinking about making today?"

export default function AiCoach() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([{ role:'model', text:WELCOME }])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [messages, open])

  const getHistory = useCallback(() =>
    messages.map(m => ({ role:m.role, parts:[{ text:m.text }] }))
  , [messages])

  const submit = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { role:'user', text }])
    setLoading(true)
    const id = Date.now()
    setMessages(prev => [...prev, { role:'model', text:'', id, streaming:true }])
    try {
      await sendMessage(getHistory(), text, (chunk) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, text:m.text+chunk } : m))
      })
      setMessages(prev => prev.map(m => m.id === id ? { ...m, streaming:false } : m))
    } catch(e) {
      setMessages(prev => prev.map(m =>
        m.id === id ? { ...m, text:'Oops! I had trouble connecting. Check your VITE_GEMINI_API_KEY in .env.local and restart the dev server.', streaming:false } : m
      ))
    }
    setLoading(false)
  }, [input, loading, getHistory])

  const onKey = (e) => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); submit() } }

  return (
    <>
      {/* Floating pill */}
      <motion.button
        onClick={() => setOpen(o=>!o)}
        className="coach-float"
        whileTap={{ scale:0.93 }}
        style={{
          position:'fixed', bottom:22, right:22,
          background:'linear-gradient(135deg,#6a1b9a,#c2185b)',
          border:'none', borderRadius:50,
          padding:'10px 20px', cursor:'pointer',
          color:'white', fontFamily:'Fredoka', fontWeight:700, fontSize:15,
          zIndex:200, display:'flex', alignItems:'center', gap:8,
          boxShadow:'0 4px 20px rgba(106,27,154,0.55)',
        }}
      >
        <span className={open ? '' : 'coach-breathe'} style={{ fontSize:19, display:'inline-block' }}>🧠</span>
        {open ? 'close coach' : 'ask coach'}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, scale:0.88, y:24 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.88, y:24 }}
            transition={{ type:'spring', stiffness:340, damping:28 }}
            style={{
              position:'fixed', bottom:76, right:22,
              width:340, height:468,
              background:'#16213e', borderRadius:18, zIndex:199,
              border:'2px solid var(--syn-6)',
              boxShadow:'0 8px 40px rgba(106,27,154,0.45)',
              display:'flex', flexDirection:'column', overflow:'hidden',
            }}
          >
            {/* Panel header */}
            <div style={{
              padding:'10px 14px', background:'#0f3460',
              borderBottom:'1px solid var(--syn-6)',
              display:'flex', alignItems:'center', gap:8, flexShrink:0,
            }}>
              <span style={{ fontSize:18 }}>🧠</span>
              <span style={{ fontFamily:'Fredoka', fontWeight:700, fontSize:15, color:'var(--syn-7)' }}>Coach</span>
              <span style={{ color:'#555', fontSize:11, marginLeft:2 }}>Rainbowbrain Momentumlab</span>
            </div>

            {/* Messages */}
            <div style={{ flex:1, overflowY:'auto', padding:'12px 10px', display:'flex', flexDirection:'column' }}>
              {messages.map((m, i) => (
                <CoachMessage key={m.id||i} role={m.role} text={m.text} isStreaming={m.streaming} />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div style={{ padding:'8px 10px', borderTop:'1px solid #0f3460', display:'flex', gap:8, flexShrink:0 }}>
              <textarea
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask coach anything..."
                rows={2}
                style={{
                  flex:1, resize:'none', background:'#0a1020',
                  border:'1px solid var(--syn-6)', borderRadius:8,
                  color:'#f5f5f5', fontFamily:'Fredoka', fontSize:14,
                  padding:'6px 10px', outline:'none', lineHeight:1.4,
                }}
              />
              <button
                onClick={submit}
                disabled={loading || !input.trim()}
                style={{
                  background: (loading||!input.trim()) ? '#333' : 'var(--syn-6)',
                  border:'none', borderRadius:8, color:'white',
                  fontFamily:'Fredoka', fontWeight:700, fontSize:14,
                  padding:'0 14px', cursor:(loading||!input.trim()) ? 'default' : 'pointer',
                  transition:'background 0.15s',
                }}
              >
                send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}