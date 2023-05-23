# readme

## 快速开始

```bash
pnpm i
```

## changeset

### 配置

将 changeset 安装到工作空间根目录

```bash
pnpm add -Dw @changesets/cli
```

初始化 changeset

```bash
pnpm changeset init
```

如此将生成 `.changeset` 目录。

### 添加变更

当完成一个版本的开发，需要生成新的变更时，可在工作空间根目录执行

```bash
pnpm changeset
```

选择合适的选项，回车确定后，`.changeset` 目录中将生成记录变更的md文件，用于后续消费。

### 发布变更

在 changeset 根目录中执行

```bash
# 根据 semver 规则提升版本，消耗 .changeset 中的记录文件，生成 changelog。
pnpm  changeset version

# 更新锁文件，重新构建包
pnpm install

# 提交更改到仓库

# 发布
pnpm changeset publish
```

该操作将为工作目录中尚未发布操作的包执行发布操作，并生成 changelog。
默认发包至 <https://registry.npmjs.org/>，若需更改发包仓库，可配置 `npm_config_registry` 环境变量

```bash
npm_config_registry=https://registry.npmmirror.com/ pnpm changeset publish
```

或在 `package.json` 中配置 `publishConfig` 配置项

```json
{
   // ...
   "publishConfig": {
      "registry": "https://r.cnpmjs.org"
   },
   // ...
}
```

## 交叉（依赖）编译

假设有monorepo结构如下：

```shell
├── examples     // examples 目录，下为示例包
│   └── xcompile 
└── packages     // packages 目录，下为模块包
    ├── cache    // cache 模块
    └── logger    // logger 模块

```
xcompile、cache、logger 均为 typescript 项目，xcompile 项目依赖 cache 与 logger 模块，现在要实现 编译 xcompile 项目时，先编译 cache 与 logger 模块的效果（交叉编译），需遵循以下步骤：
1. 工作区的 tsconfig.json 声明 reference 配置，包含子项目的路径:
   ```json
   {
      // ...
      "references": [
        { "path": "packages/cache" },
        { "path": "packages/logger" },
        { "path": "examples/xcompile" }
      ]
   }
   ```
2. xcompile 项目项目下的 tsconfig.json 声明其依赖的模块：
   ```json
   {
      // ...
      "references": [
         { "path": "../../packages/cache" },
         { "path": "../../packages/logger" }
       ],
   }
   ```
   同时，为了在子项目未编译时仍能正确的识别类型，需为子项目配置 alias，指向其ts入口文件：
   ```json
   {
      "compilerOptions": {
          // ... 
          "paths": {
            "@mono/logger": ["../../packages/logger/src"],
            "@mono/cache": ["../../packages/cache/src"]
          }
        },
   }
   ```
3. 子项目的`tsconfig.json`添加`composite`属性，配置alias：
   ```json
   {
      "compilerOptions": {
        // ...
        "composite": true, // 使用references 字段引入的配置文件需要设置 composite: true
        "paths": {
          "@mono/cache/*": ["../cache/src/*"],
        }
      },
   }
   ```

4. 到 xcompile 目录下，执行以下脚本：
   ```shell
   npx tsc --build
   ```
   `--build` 配置必须添加，不然不会编译依赖项。
