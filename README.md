# vieko

A terminal one-pager for [vieko.dev](https://vieko.dev). Shamelessly inspired
by [`ctate`](https://www.npmjs.com/package/ctate).

```
npx vieko
```

Browse recent writing without leaving the terminal. Zero dependencies — pure
Node + ANSI escape codes, no native binary, no build step.

## Keys

| Key         | Action           |
| ----------- | ---------------- |
| `↑`/`k`     | Move up          |
| `↓`/`j`     | Move down        |
| `Enter`     | Open selected post |
| `g`         | Open github.com/vieko |
| `x`         | Open x.com/vieko |
| `q` / `Esc` | Quit             |

## Updating content

The writing list in `src/data.js` is hand-mirrored from
[`vieko.dev`'s `src/lib/posts.ts`](https://github.com/vieko/vieko.dev/blob/main/src/lib/posts.ts).
There's no fetch/build coupling between the two repos — update it by hand
when new writing ships.

## License

MIT
