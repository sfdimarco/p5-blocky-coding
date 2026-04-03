import React, { useState, useCallback } from 'react'
import Header from './components/Header'
import BlockWorkspace from './components/BlockWorkspace'
import LiveCanvas from './components/LiveCanvas'
import CodePeek from './components/CodePeek'
import AiCoach from './components/AiCoach'

export default function App() {
  const [code, setCode]       = useState('')
  const [peekOpen, setPeekOpen] = useState(false)
  const handleCode = useCallback((c) => setCode(c), [])

  return (
    <div className="app-container">
      <Header onPeek={() => setPeekOpen(o=>!o)} peekOpen={peekOpen} />
      <div className="panels">
        <BlockWorkspace onCodeChange={handleCode} />
        <LiveCanvas code={code} />
      </div>
      {peekOpen && <CodePeek code={code} />}
      <AiCoach />
    </div>
  )
}