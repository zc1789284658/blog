# simple-git-hooks

这是一个简易的git hook工具，便于用户管理git hook

[npmjs.com](https://www.npmjs.com/package/simple-git-hooks)

[github](https://github.com/toplenboren/simple-git-hooks)

## 使用simple-git-hooks进行commit-msg校验

### example

[package.json](https://github.com/vuejs/core/commit/ca9920c7d708c9da48ef0bd116610f1ecb6b56a9#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519L45)

[verify-commit.js](https://github.com/vuejs/core/blob/main/scripts/verify-commit.js)

::: code-group

```json [package.json]
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged && pnpm check",
    "commit-msg": "node scripts/verify-commit.js"  // [!code highlight]
  },
}
```

```js [verify-commit.js]
// @ts-check
import pico from 'picocolors'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${pico.white(pico.bgRed(' ERROR '))} ${pico.red(
      `invalid commit message format.`,
    )}\n\n` +
      pico.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${pico.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${pico.green(
        `fix(v-model): handle events on blur (close #28)`,
      )}\n\n` +
      pico.red(`  See .github/commit-convention.md for more details.\n`),
  )
  process.exit(1)
}
```


:::


