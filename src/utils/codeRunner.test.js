import { describe, it, expect } from 'vitest'
import { buildSrcdoc } from './codeRunner'

describe('buildSrcdoc', () => {
  it('includes p5.js CDN', () => {
    expect(buildSrcdoc('')).toContain('p5.min.js')
  })
  it('includes user code in draw', () => {
    expect(buildSrcdoc('circle(200,200,80);')).toContain('circle(200,200,80);')
  })
  it('includes error overlay element', () => {
    expect(buildSrcdoc('')).toContain('id="err"')
  })
  it('is a complete HTML document', () => {
    const doc = buildSrcdoc('')
    expect(doc).toContain('<!DOCTYPE html>')
    expect(doc).toContain('</html>')
  })
})