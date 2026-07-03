import readline from 'node:readline'
import {
  SITE_URL,
  TAGLINE,
  GITHUB_URL,
  GITHUB_DISPLAY,
  X_URL,
  X_DISPLAY,
  EMAIL,
  EMAIL_URL,
  POSTS,
} from './data.js'
import { renderWord } from './font.js'
import { openUrl } from './open-url.js'

const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'
const DIM = '\x1b[2m'
const REVERSE = '\x1b[7m'
const WHITE = '\x1b[97m'
const NAV_SYMBOLS = '\u2191\u2193\u21b5' // up, down, return
const GRAY = '\x1b[90m'

const MIN_WIDTH = 60
const MAX_WIDTH = 78
const FIXED_CHROME_LINES = 14 // blank+logo(7)+blank+tagline+blank+header+blank+footer
const MIN_VISIBLE_ROWS = 3

const state = {
  selected: 0,
  scrollOffset: 0,
}

function width() {
  const columns = process.stdout.columns || MAX_WIDTH
  return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, columns - 2))
}

function truncate(str, max) {
  if (str.length <= max) return str
  if (max <= 1) return str.slice(0, max)
  return str.slice(0, max - 1) + '\u2026'
}

function padEnd(str, len) {
  if (str.length >= len) return str
  return str + ' '.repeat(len - str.length)
}

function splitRow(left, right, total) {
  const rightLen = right.length
  const leftMax = Math.max(0, total - rightLen - 1)
  const leftTrunc = truncate(left, leftMax)
  const gap = Math.max(1, total - leftTrunc.length - rightLen)
  return leftTrunc + ' '.repeat(gap) + right
}

function visibleRows(w) {
  const rows = process.stdout.rows || 24
  const max = Math.max(MIN_VISIBLE_ROWS, rows - FIXED_CHROME_LINES)
  return Math.min(POSTS.length, max)
}

function clampScroll(w) {
  const visible = visibleRows(w)
  if (state.selected < state.scrollOffset) {
    state.scrollOffset = state.selected
  } else if (state.selected >= state.scrollOffset + visible) {
    state.scrollOffset = state.selected - visible + 1
  }
  const maxOffset = Math.max(0, POSTS.length - visible)
  state.scrollOffset = Math.min(state.scrollOffset, maxOffset)
}

function frame() {
  const w = width()
  clampScroll(w)
  const visible = visibleRows(w)
  const lines = []

  lines.push('')

  for (const logoLine of renderWord('vieko')) {
    lines.push('  ' + BOLD + WHITE + logoLine + RESET)
  }

  lines.push('')

  lines.push(
    '  ' +
      DIM +
      GRAY +
      truncate(TAGLINE, w) +
      RESET,
  )

  lines.push('')

  const headerLabel = 'RECENT WRITING'
  const ruleLen = Math.max(0, w - headerLabel.length - 1)
  lines.push(
    '  ' + DIM + GRAY + headerLabel + ' ' + '\u2500'.repeat(ruleLen) + RESET,
  )

  const start = state.scrollOffset
  const end = Math.min(POSTS.length, start + visible)

  for (let i = start; i < end; i++) {
    const post = POSTS[i]
    const isSelected = i === state.selected
    const row = splitRow(post.title, post.date, w)
    if (isSelected) {
      lines.push('  ' + REVERSE + padEnd(row, w) + RESET)
    } else {
      lines.push('  ' + WHITE + row + RESET)
    }
  }

  for (let i = end - start; i < visible; i++) {
    lines.push('')
  }

  lines.push('')

  const label = (text) => `${DIM}${GRAY}${text}${RESET}`
  const mnemonic = (text, index) => {
    const before = text.slice(0, index)
    const char = text[index]
    const after = text.slice(index + 1)
    return `${before ? label(before) : ''}${BOLD}${WHITE}${char}${RESET}${after ? label(after) : ''}`
  }

  const segments = [
    [`${BOLD}${WHITE}${NAV_SYMBOLS}${RESET} ${label('open')}`, `${NAV_SYMBOLS} open`],
    [mnemonic(GITHUB_DISPLAY, 0), GITHUB_DISPLAY],
    [mnemonic(X_DISPLAY, 0), X_DISPLAY],
    [mnemonic(EMAIL, 1), EMAIL],
    [mnemonic('quit', 0), 'quit'],
  ]

  let hints = ''
  let hintsPlain = ''
  segments.forEach(([styled, plain], index) => {
    hints += styled
    hintsPlain += plain
    if (index < segments.length - 1) {
      hints += '   '
      hintsPlain += '   '
    }
  })
  const gap = Math.max(0, w - hintsPlain.length)
  lines.push('  ' + hints + ' '.repeat(gap))

  return lines.join('\r\n')
}

function render() {
  process.stdout.write('\x1b[H\x1b[0J' + frame())
}

function cleanup() {
  process.stdout.write('\x1b[?25h\x1b[?1049l')
}

function openSelected() {
  const post = POSTS[state.selected]
  if (post) openUrl(SITE_URL + post.slug)
}

function runInteractive() {
  process.stdout.write('\x1b[?1049h\x1b[?25l')
  render()

  readline.emitKeypressEvents(process.stdin)
  if (process.stdin.isTTY) process.stdin.setRawMode(true)
  process.stdin.resume()

  process.stdin.on('keypress', (_str, key = {}) => {
    if (key.ctrl && key.name === 'c') return quit()

    switch (key.name) {
      case 'up':
      case 'k':
        state.selected = Math.max(0, state.selected - 1)
        render()
        break
      case 'down':
      case 'j':
        state.selected = Math.min(POSTS.length - 1, state.selected + 1)
        render()
        break
      case 'return':
        openSelected()
        break
      case 'g':
        openUrl(GITHUB_URL)
        break
      case 'x':
        openUrl(X_URL)
        break
      case 'e':
        openUrl(EMAIL_URL)
        break
      case 'q':
      case 'escape':
        quit()
        break
      default:
        break
    }
  })

  process.stdout.on('resize', render)
}

function quit() {
  process.exit(0)
}

function runNonInteractive() {
  console.log('vieko.dev — recent writing\n')
  for (const post of POSTS) {
    console.log(`${post.title}  (${post.date})`)
    console.log(`  ${SITE_URL}${post.slug}`)
  }
}

export function start() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    runNonInteractive()
    return
  }

  process.on('SIGINT', quit)
  process.on('SIGTERM', quit)
  process.on('exit', cleanup)

  runInteractive()
}
