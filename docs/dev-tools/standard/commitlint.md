# Commitlint

[https://commitlint.js.org/](https://commitlint.js.org/)

## install

```bash
pnpm add -D @commitlint/config-conventional @commitlint/cli
```


## 无husky时，需要先配置husky

```bash
pnpm add -D husky

npx husky init
```

## 已有husky的情况下，配置husky git hook

```bash
# Add commit message linting to commit-msg hook
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

::: warning Windows
在`windows`的情况下，上述`echo`会导致运行时`git`报错:\
*git .husky/commit-msg: cannot execute binary file*\
\
建议手动生成`.husky/commit-msg`文件，并将`echo`内容粘贴进去
:::

## 配置commitlint config文件

::: code-group

```ts [commitlint.config.ts]
import type {UserConfig} from '@commitlint/types';
import {RuleConfigSeverity} from '@commitlint/types';

const Configuration: UserConfig = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
};

module.exports = Configuration;
```

:::
