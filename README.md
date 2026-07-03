# @vieko/cli

A terminal one-pager for [vieko.dev](https://vieko.dev). Shamelessly inspired
by [`ctate`](https://www.npmjs.com/package/ctate).

```
npx @vieko/cli
```

Browse recent writing without leaving the terminal. Zero dependencies.

## Keys

| Key         | Action           |
| ----------- | ---------------- |
| `↑`/`k`     | Move up          |
| `↓`/`j`     | Move down        |
| `Enter`     | Open selected post |
| `g`         | Open my github profile |
| `x`         | Open my X profile |
| `e`         | Send me an email |
| `q` / `Esc` | Quit             |

## Updating content

The writing list in `src/data.js` is hand-mirrored from
[`vieko.dev`'s `src/lib/posts.ts`](https://github.com/vieko/vieko.dev/blob/main/src/lib/posts.ts).
There's no fetch/build coupling between the two repos, so update it by hand
when new writing ships.

## License

MIT
