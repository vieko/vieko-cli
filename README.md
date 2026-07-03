# @vieko/cli

A terminal one-pager for [vieko.dev](https://vieko.dev). Shamelessly inspired
by [`ctate`](https://www.npmjs.com/package/ctate).

```
npx @vieko/cli
```

Browse recent writing without leaving the terminal. Zero dependencies: pure
Node and ANSI escape codes, no native binary, no build step.

## Keys

| Key         | Action           |
| ----------- | ---------------- |
| `↑`/`k`     | Move up          |
| `↓`/`j`     | Move down        |
| `Enter`     | Open selected post |
| `g`         | Open github.com/vieko |
| `x`         | Open x.com/vieko |
| `e`         | Email hello@vieko.dev |
| `q` / `Esc` | Quit             |

## Updating content

The writing list in `src/data.js` is hand-mirrored from
[`vieko.dev`'s `src/lib/posts.ts`](https://github.com/vieko/vieko.dev/blob/main/src/lib/posts.ts).
There's no fetch/build coupling between the two repos, so update it by hand
when new writing ships.

## Releasing

CI publishes to npm on tag push, no local `npm publish` needed:

1. Bump `version` in `package.json`.
2. Commit: `git commit -am "chore(release): vX.Y.Z"`.
3. Tag: `git tag vX.Y.Z && git push origin main --tags`.
4. `.github/workflows/release.yml` verifies the tag matches
   `package.json`, runs `npm test`, then publishes with provenance using
   the `NPM_TOKEN` repo secret.

## License

MIT
