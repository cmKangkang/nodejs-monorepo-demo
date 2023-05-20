# readme

## 快速开始

```bash
pnpm i
```

## changeset

```bash
# changeset init
pnpm changeset init
pnpm changeset
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


# todo

1. 增加 lint
2. 增加 测试
3. 增加 commitlint

