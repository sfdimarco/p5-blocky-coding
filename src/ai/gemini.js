import { GoogleGenAI } from '@google/genai'
import { SYSTEM_PROMPT } from './systemPrompt'

// --- Gemini Flash (free tier via Google AI Studio) ---
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' })

// --- Claude API stub (uncomment + npm i @anthropic-ai/sdk to swap) ---
// import Anthropic from '@anthropic-ai/sdk'
// const anthropic = new Anthropic({ apiKey: import.meta.env.VITE_CLAUDE_API_KEY })
// export async function sendMessage(history, userMessage, onChunk) {
//   const stream = anthropic.messages.stream({
//     model: 'claude-sonnet-4-6', max_tokens: 1024,
//     system: SYSTEM_PROMPT,
//     messages: [
//       ...history.map(m => ({ role: m.role === 'model' ? 'assistant' : 'user', content: m.parts[0].text })),
//       { role: 'user', content: userMessage }
//     ]
//   })
//   let full = ''
//   for await (const e of stream) {
//     if (e.type === 'content_block_delta') { full += e.delta.text; onChunk(e.delta.text) }
//   }
//   return full
// }

/**
 * Send a message to Gemini Flash with full conversation history.
 * @param {Array<{role:'user'|'model', parts:[{text:string}]}>} history
 * @param {string} userMessage
 * @param {(chunk:string)=>void} onChunk
 * @returns {Promise<string>}
 */
export async function sendMessage(history, userMessage, onChunk) {
  const chat = ai.chats.create({
    model: 'gemini-2.0-flash',
    config: { systemInstruction: SYSTEM_PROMPT },
    history,
  })
  const stream = await chat.sendMessageStream({ message: userMessage })
  let full = ''
  for await (const chunk of stream) {
    const text = chunk.text
    if (text) { full += text; onChunk(text) }
  }
  return full
}