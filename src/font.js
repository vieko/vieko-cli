// "vieko" wordmark variants. Swap the active one via LOGO_LINES below —
// keeping all three around makes it cheap to change our minds later.

// Option A: hand-crafted half-block (▀▄█) wordmark, compact (4 rows).
export const LOGO_HALF_BLOCK = [
  '      \u2580\u2580        \u2584\u2584           ',
  '\u2588\u2588 \u2588\u2588 \u2588\u2588  \u2584\u2588\u2580\u2588\u2584 \u2588\u2588 \u2584\u2588\u2580 \u2584\u2588\u2588\u2588\u2584 ',
  '\u2588\u2588\u2584\u2588\u2588 \u2588\u2588  \u2588\u2588\u2584\u2588\u2580 \u2588\u2588\u2588\u2588   \u2588\u2588 \u2588\u2588 ',
  ' \u2580\u2588\u2580  \u2588\u2588\u2584 \u2580\u2588\u2584\u2584\u2584 \u2588\u2588 \u2580\u2588\u2584 \u2580\u2588\u2588\u2588\u2580',
]

// Option B: "ANSI Shadow" figlet-style block-and-line wordmark (6 rows).
export const LOGO_ANSI_SHADOW = [
  '██╗   ██╗██╗███████╗██╗  ██╗ ██████╗ ',
  '██║   ██║██║██╔════╝██║ ██╔╝██╔═══██╗',
  '██║   ██║██║█████╗  █████╔╝ ██║   ██║',
  '╚██╗ ██╔╝██║██╔══╝  ██╔═██╗ ██║   ██║',
  ' ╚████╔╝ ██║███████╗██║  ██╗╚██████╔╝',
  '  ╚═══╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ',
]

// Option C: 5x7 dot-matrix font, doubled-width block pixels, generic per
// letter (only v/i/e/k/o glyphs defined). Kept for reference / reuse.
const GLYPHS = {
  v: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  i: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  e: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  k: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  o: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
}

const PIXEL = '\u2588\u2588'
const BLANK = '  '
const GAP = '  '

export function renderWord(word) {
  const letters = word
    .toLowerCase()
    .split('')
    .map((char) => GLYPHS[char])
    .filter(Boolean)

  if (letters.length === 0) return []

  const height = letters[0].length
  const lines = []

  for (let row = 0; row < height; row++) {
    const parts = letters.map((glyph) =>
      glyph[row].map((bit) => (bit ? PIXEL : BLANK)).join(''),
    )
    lines.push(parts.join(GAP))
  }

  return lines
}

export const LOGO_DOT_MATRIX = renderWord('vieko')

// --- active logo — swap this to try the others ---
export const LOGO_LINES = LOGO_ANSI_SHADOW
